const express = require('express');
const router = express.Router();
const db = require('../database');

// POST /logs/:id/taken
router.post('/:id/taken', (req, res) => {
  const { id } = req.params;
  
  const stmt = db.prepare('UPDATE logs SET status = ?, taken_at = datetime("now") WHERE id = ?');
  stmt.run(['taken', id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Log not found' });
    }
    res.status(200).json({ id, status: 'taken' });
  });
});

// GET /logs?user_id=1&date=2026-04-12
router.get('/', (req, res) => {
  const { user_id, date } = req.query;
  
  if (!user_id || !date) {
    return res.status(400).json({ error: 'Missing required query parameters: user_id, date' });
  }

  const query = `
    SELECT logs.id, logs.status, logs.reminder_sent_at, logs.taken_at, medications.name, medications.time 
    FROM logs 
    JOIN medications ON logs.medication_id = medications.id 
    WHERE medications.user_id = ? AND logs.date = ?
    ORDER BY medications.time ASC
  `;

  db.all(query, [user_id, date], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

module.exports = router;
