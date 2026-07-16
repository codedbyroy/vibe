/**
 * Notification Service — FCM Integration
 * 
 * Uses firebase-admin SDK to deliver push notifications.
 * Falls back to console logging if Firebase is not configured
 * (allows development/testing without a Firebase project).
 * 
 * Implements:
 *   NOTIF-01: FCM push to elderly app
 *   NOTIF-02: Re-remind (called by scheduler)
 *   NOTIF-03: Caregiver escalation alert
 *   NOTIF-04: Retry mechanism (5 min retry on failure)
 */

const db = require('../database');

// ─── FCM configuration ─────────────────────────────────────────
let fcmEnabled = false;
let admin = null;

try {
  admin = require('firebase-admin');
  
  // Check for service account credentials
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountPath) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    fcmEnabled = true;
    console.log('[NOTIFICATION] Firebase Admin SDK initialized — FCM is LIVE');
  } else {
    console.log('[NOTIFICATION] No FIREBASE_SERVICE_ACCOUNT env var — running in STUB mode');
  }
} catch (err) {
  console.log('[NOTIFICATION] firebase-admin not installed — running in STUB mode');
  console.log('[NOTIFICATION] To enable FCM: npm install firebase-admin && set FIREBASE_SERVICE_ACCOUNT');
}

// ─── Core send function ─────────────────────────────────────────
async function sendPushNotification(deviceToken, title, body) {
  if (!fcmEnabled || !deviceToken) {
    console.log(`[NOTIFICATION STUB] → "${title}: ${body}" (token: ${deviceToken || 'none'})`);
    return { success: true, mode: 'stub' };
  }

  try {
    const message = {
      notification: { title, body },
      token: deviceToken,
    };
    const response = await admin.messaging().send(message);
    console.log(`[NOTIFICATION] FCM sent successfully: ${response}`);
    return { success: true, mode: 'fcm', response };
  } catch (err) {
    console.error(`[NOTIFICATION] FCM send failed: ${err.message}`);
    return { success: false, mode: 'fcm', error: err.message };
  }
}

// ─── Get device token for a user (stub: returns null until user registration adds tokens) ──
function getDeviceToken(userId) {
  return new Promise((resolve, reject) => {
    // For now, we'll use the phone field as a placeholder for device tokens
    // In production, you'd have a separate device_tokens table
    db.get('SELECT phone FROM users WHERE id = ?', [userId], (err, row) => {
      if (err) return reject(err);
      resolve(row ? row.phone : null);
    });
  });
}

// ─── Public API ─────────────────────────────────────────────────

/**
 * Send a medication reminder to an elderly user
 * NOTIF-01 + NOTIF-02
 */
async function sendReminder(userId, medicationName) {
  try {
    const token = await getDeviceToken(userId);
    const result = await sendPushNotification(
      token,
      '💊 Time for your medicine',
      `Take ${medicationName} now`
    );
    return result;
  } catch (err) {
    console.error(`[NOTIFICATION] sendReminder failed for user ${userId}:`, err.message);
    // Queue for retry
    scheduleRetry('reminder', { userId, medicationName });
    return { success: false, error: err.message };
  }
}

/**
 * Send a missed-medication alert to the linked caregiver
 * NOTIF-03
 */
async function sendCaregiverAlert(caregiverId, elderlyName, medicationName) {
  try {
    const token = await getDeviceToken(caregiverId);
    const result = await sendPushNotification(
      token,
      '⚠️ Medication Missed',
      `${elderlyName} missed their ${medicationName}`
    );
    return result;
  } catch (err) {
    console.error(`[NOTIFICATION] sendCaregiverAlert failed for caregiver ${caregiverId}:`, err.message);
    // Queue for retry
    scheduleRetry('caregiver_alert', { caregiverId, elderlyName, medicationName });
    return { success: false, error: err.message };
  }
}

// ─── Retry mechanism (NOTIF-04) ─────────────────────────────────
const retryQueue = [];
const RETRY_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;

function scheduleRetry(type, payload, attempt = 1) {
  if (attempt > MAX_RETRIES) {
    console.error(`[NOTIFICATION] Max retries reached for ${type}. Giving up.`);
    return;
  }

  console.log(`[NOTIFICATION] Scheduling retry #${attempt} for ${type} in 5 minutes`);
  retryQueue.push({
    type,
    payload,
    attempt,
    scheduledAt: Date.now() + RETRY_INTERVAL_MS,
  });
}

// Process retry queue every minute (piggybacks on the scheduler tick)
function processRetryQueue() {
  const now = Date.now();
  const due = retryQueue.filter((item) => item.scheduledAt <= now);

  due.forEach((item) => {
    // Remove from queue
    const idx = retryQueue.indexOf(item);
    if (idx > -1) retryQueue.splice(idx, 1);

    console.log(`[NOTIFICATION] Retrying ${item.type} (attempt ${item.attempt})`);

    if (item.type === 'reminder') {
      sendReminder(item.payload.userId, item.payload.medicationName).then((result) => {
        if (!result.success) {
          scheduleRetry(item.type, item.payload, item.attempt + 1);
        }
      });
    } else if (item.type === 'caregiver_alert') {
      sendCaregiverAlert(
        item.payload.caregiverId,
        item.payload.elderlyName,
        item.payload.medicationName
      ).then((result) => {
        if (!result.success) {
          scheduleRetry(item.type, item.payload, item.attempt + 1);
        }
      });
    }
  });
}

module.exports = { sendReminder, sendCaregiverAlert, processRetryQueue };
