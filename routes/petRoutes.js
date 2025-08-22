const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', (req, res) => {
  const { name, type, age } = req.body;
  db.query('INSERT INTO pets (name, type, age) VALUES (?, ?, ?)', [name, type, age], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(201);
  });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM pets', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM pets WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});
router.put('/:id', (req, res) => {
  const { name, type, age } = req.body;
  db.query('UPDATE pets SET name=?, type=?, age=? WHERE id=?', [name, type, age, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;
