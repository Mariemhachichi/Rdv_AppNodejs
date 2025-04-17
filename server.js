const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // Pour utiliser .env

// Import des routes
const authRoute = require('./routes/AuthRoute');
const rdvRoute = require('./routes/RdvRoute');

// Création de l'application Express
const app = express();
const Port = process.env.PORT || 9000;

// Configuration du moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour lire les données envoyées dans les formulaires (POST)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fichiers statiques (Bootstrap, CSS, images, etc.)
//app.use(express.static(path.join(__dirname, 'public')));

// Routes d'affichage des pages HTML (avant les routes API)
app.get('/login', (req, res) => {
    console.log('Route /login atteinte'); // Affiche ce message dans la console
    res.render('./views/login'); // Affiche login.ejs
  });

app.get('/register', (req, res) => {
  res.render('register'); // Affiche register.ejs
});

// Routes API (inscription, connexion, rdv...)
app.use('/', authRoute);
app.use('/', rdvRoute);

//  Connexion à MongoDB
mongoose.connect(process.env.URL_BD)
  .then(() => {
    console.log("Connecté à la base de données !");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
  });

// Lancement du serveur
app.listen(Port, () => {
  console.log(` Serveur lancé sur http://localhost:${Port}`);
});
