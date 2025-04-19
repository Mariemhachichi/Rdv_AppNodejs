const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.get('/user-info', isAuthenticated, (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;

