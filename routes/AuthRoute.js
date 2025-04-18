const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

// Inscription utilisateur
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });

        await user.save();
        return res.status(201).send({ message: "Utilisateur enregistré", user });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'Utilisateur introuvable' });
        }

        // Vérification du mot de passe
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).send({ message: 'Mot de passe incorrect' });
        }

        // Création du token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Retour du token + rôle pour redirection front
        return res.status(200).send({
            message: 'Connexion réussie',
            token: token,
            role: user.role // ajout ici pour le front
        });

    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

module.exports = router;
