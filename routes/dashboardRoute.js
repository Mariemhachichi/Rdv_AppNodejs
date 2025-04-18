const express = require('express');
const router = express.Router();
const auth = require('../middelware/auth');

// Route pour l'admin
router.get('/dashboard/admin', auth, (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send("Non authentifié");
      }
  
      if (req.user.role !== 'admin') {
        return res.status(403).send("Accès refusé");
      }
  
      console.log("Dashboard Admin - Utilisateur :", req.user.email);
      res.render('dashboard_admin', { user: req.user });
    } catch (err) {
      console.error("Erreur dans /dashboard/admin :", err);
      res.status(500).send("Erreur serveur");
    }
  });
  

// Route pour le professionnel
router.get('/dashboard/pro', auth, (req, res) => {
    if (req.user.role !== 'professionel') {
        return res.status(403).send('Accès refusé');
    }
    res.render('dashboard_pro', { user: req.user });
});

// Route pour le client
router.get('/dashboard/client', auth, (req, res) => {
    if (req.user.role !== 'client') {
        return res.status(403).send('Accès refusé');
    }
    res.render('dashboard_client', { user: req.user });
});

module.exports = router;
