const express = require('express');
const router = express.Router();
const db = require('../database');

// POST /caregiver/link
router.post('/link', (req, res) => {
  const { caregiver_id, elderly_user_id } = req.body;
  if (!caregiver_id || !elderly_user_id) {
    return res.status(400).json({ error: 'Missing required fields: caregiver_id, elderly_user_id' });
  }
  
  // Update the elderly user to link the caregiver
  const stmt = db.prepare('UPDATE users SET linked_user_id = ? WHERE id = ? AND role = "elderly"');
  stmt.run([caregiver_id, elderly_user_id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Elderly user not found or not an elderly role.' });
    }
    res.status(200).json({ elderly_user_id, linked_caregiver_id: caregiver_id });
  });
});

module.exports = router;
