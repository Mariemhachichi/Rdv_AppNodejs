const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth'); // Vérifie que le chemin est correct

// Dashboard admin
router.get('/dashboard/admin', isAuthenticated, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // Redirection si l'utilisateur n'est pas authentifié
  }
  console.log("Dashboard Admin - Utilisateur :", req.session.user.email);
  res.render('dashboard_admin', { user: req.session.user });
});

router.get('/calendar', (req, res) => {
  res.render('calendar'); 
});


// Dashboard professionnel
router.get('/dashboard/pro', isAuthenticated, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // Redirection si l'utilisateur n'est pas authentifié
  }
  console.log("Dashboard Pro - Utilisateur :", req.session.user.email);
  res.render('dashboard_pro', { user: req.session.user });
});

// Dashboard client
router.get('/dashboard/client', isAuthenticated, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // Redirection si l'utilisateur n'est pas authentifié
  }
  console.log("Dashboard Client - Utilisateur :", req.session.user.email);
  res.render('dashboard_client', { user: req.session.user });
});

module.exports = router;
