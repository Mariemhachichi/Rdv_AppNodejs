const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Import des routes
const authRoute = require('./routes/AuthRoute');
const rdvRoute = require('./routes/RdvRoute');

const app = express();
const Port = process.env.PORT || 9000;

// Configuration EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Middleware pour les données de formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour Css
app.use(express.static(path.join(__dirname, 'public'))); 

// Routes pour les pages
app.get('/login', (req, res) => {
    res.render('login'); 
});

app.get('/register', (req, res) => {
    res.render('register'); 
});

// Routes API
app.use('/', authRoute);
app.use('/', rdvRoute);

// Connexion MongoDB
mongoose.connect(process.env.URL_BD)
    .then(() => console.log("Connecté à MongoDB !"))
    .catch(err => console.error("Erreur MongoDB :", err));

// Démarrage du serveur
app.listen(Port, () => {
    console.log(`Serveur démarré sur:${Port}`);
});
