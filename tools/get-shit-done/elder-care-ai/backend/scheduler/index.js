/**
 * Cron Scheduler Engine
 * 
 * Runs every minute (* * * * *). Two core tasks per tick:
 * 
 * Task 1 — Trigger Reminders:
 *   If current HH:MM matches a medication's scheduled time AND
 *   no log exists for that medication today → create a "pending" log
 *   and fire the notification stub.
 * 
 * Task 2 — Sweep Missed:
 *   If a log has status "pending" AND reminder_sent_at is older than
 *   30 minutes → mark it "missed" and trigger caregiver escalation.
 * 
 * Task 3 — Re-remind (10 min):
 *   If a log has status "pending" AND reminder_sent_at is between
 *   10 and 30 minutes old → resend reminder notification.
 */

const cron = require('node-cron');
const db = require('../database');
const { sendReminder, sendCaregiverAlert, processRetryQueue } = require('../services/notificationService');

// ─── helpers ────────────────────────────────────────────────────
function getCurrentDate() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function getCurrentTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function minutesAgo(minutes) {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

// ─── Task 1: Trigger Reminders ─────────────────────────────────
function triggerReminders() {
  const today = getCurrentDate();
  const currentTime = getCurrentTime();

  // Find active medications due right now that DON'T already have a log today
  const query = `
    SELECT m.id AS med_id, m.user_id, m.name
    FROM medications m
    WHERE m.active = 1
      AND m.time = ?
      AND m.id NOT IN (
        SELECT medication_id FROM logs WHERE date = ?
      )
  `;

  db.all(query, [currentTime, today], (err, rows) => {
    if (err) {
      console.error('[SCHEDULER] triggerReminders error:', err.message);
      return;
    }

    rows.forEach((med) => {
      const now = new Date().toISOString();
      const insertStmt = db.prepare(
        'INSERT INTO logs (medication_id, date, status, reminder_sent_at) VALUES (?, ?, ?, ?)'
      );
      insertStmt.run([med.med_id, today, 'pending', now], function (insertErr) {
        if (insertErr) {
          console.error('[SCHEDULER] Failed to create log:', insertErr.message);
          return;
        }
        console.log(`[SCHEDULER] Created pending log #${this.lastID} for "${med.name}" (user ${med.user_id})`);
        sendReminder(med.user_id, med.name);
      });
    });
  });
}

// ─── Task 2: Sweep Missed (30 min threshold) ───────────────────
function sweepMissed() {
  const threshold = minutesAgo(30);

  const query = `
    SELECT logs.id AS log_id, logs.medication_id, medications.name AS med_name,
           medications.user_id, users.linked_user_id AS caregiver_id, users.name AS elderly_name
    FROM logs
    JOIN medications ON logs.medication_id = medications.id
    JOIN users ON medications.user_id = users.id
    WHERE logs.status = 'pending'
      AND logs.reminder_sent_at <= ?
  `;

  db.all(query, [threshold], (err, rows) => {
    if (err) {
      console.error('[SCHEDULER] sweepMissed error:', err.message);
      return;
    }

    rows.forEach((row) => {
      // Mark as missed
      db.run('UPDATE logs SET status = ? WHERE id = ?', ['missed', row.log_id], (updateErr) => {
        if (updateErr) {
          console.error('[SCHEDULER] Failed to mark missed:', updateErr.message);
          return;
        }
        console.log(`[SCHEDULER] Log #${row.log_id} marked MISSED ("${row.med_name}" for ${row.elderly_name})`);

        // Escalate to caregiver
        if (row.caregiver_id) {
          sendCaregiverAlert(row.caregiver_id, row.elderly_name, row.med_name);

          // Record alert in DB
          db.run(
            'INSERT INTO alerts (log_id, sent_at, type, status) VALUES (?, datetime("now"), ?, ?)',
            [row.log_id, 'push', 'sent'],
            (alertErr) => {
              if (alertErr) {
                console.error('[SCHEDULER] Failed to record alert:', alertErr.message);
              }
            }
          );
        } else {
          console.warn(`[SCHEDULER] No caregiver linked for user ${row.user_id} — alert skipped`);
        }
      });
    });
  });
}

// ─── Task 3: Re-remind (10 min, still pending) ─────────────────
function reRemind() {
  const tenMinAgo = minutesAgo(10);
  const thirtyMinAgo = minutesAgo(30);

  const query = `
    SELECT logs.id AS log_id, medications.user_id, medications.name AS med_name
    FROM logs
    JOIN medications ON logs.medication_id = medications.id
    WHERE logs.status = 'pending'
      AND logs.reminder_sent_at <= ?
      AND logs.reminder_sent_at > ?
  `;

  db.all(query, [tenMinAgo, thirtyMinAgo], (err, rows) => {
    if (err) {
      console.error('[SCHEDULER] reRemind error:', err.message);
      return;
    }

    rows.forEach((row) => {
      console.log(`[SCHEDULER] Re-reminding user ${row.user_id} for "${row.med_name}" (log #${row.log_id})`);
      sendReminder(row.user_id, row.med_name);
    });
  });
}

// ─── Schedule: every minute ─────────────────────────────────────
function startScheduler() {
  console.log('[SCHEDULER] Cron scheduler started — ticking every minute');

  cron.schedule('* * * * *', () => {
    const ts = new Date().toISOString();
    console.log(`\n[SCHEDULER] ── Tick @ ${ts} ──`);

    triggerReminders();
    reRemind();
    sweepMissed();
    processRetryQueue();
  });
}

module.exports = { startScheduler, triggerReminders, sweepMissed, reRemind };
