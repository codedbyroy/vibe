const express = require('express');
const router = express.Router();
const db = require('../database');

// POST /medications
router.post('/', (req, res) => {
  const { user_id, name, time } = req.body;
  if (!user_id || !name || !time) {
    return res.status(400).json({ error: 'Missing required fields: user_id, name, time' });
  }

  const stmt = db.prepare('INSERT INTO medications (user_id, name, time, active) VALUES (?, ?, ?, 1)');
  stmt.run([user_id, name, time], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, user_id, name, time, active: true });
  });
});

// GET /medications/today?user_id=1
router.get('/today', (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: 'Missing required query parameter: user_id' });
  }

  db.all('SELECT * FROM medications WHERE user_id = ? AND active = 1', [user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

module.exports = router;
