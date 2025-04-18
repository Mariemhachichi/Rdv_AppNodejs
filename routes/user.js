const express = require('express');
const router = express.Router();
const auth = require('../middelware/auth');

router.get('/user-info', auth, (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;

