const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  // Vérification de l'existence de l'en-tête Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou mal formaté" });
  }

  // Extraction du token
  const token = authHeader.split(" ")[1];
  console.log("🎟️ Token reçu :", token);

  try {
    // Vérification et décodage du token
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Attacher l'utilisateur trouvé à la requête
    req.user = user; 
    console.log("👤 Utilisateur trouvé :", user.email, user.role);

    next(); // Passer au middleware suivant
  } catch (err) {
    console.error("❌ Erreur middleware auth :", err);
    // Gestion d'erreur dans le cas où le token est invalide ou expiré
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: "Token invalide" });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: "Token expiré" });
    }
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = auth;
