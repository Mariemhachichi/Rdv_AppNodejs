const jwt = require('jsonwebtoken')
const User = require('../models/User')
const KEY = process.env.SECRET_KEY

const auth = async(req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(401).send({message : 'Token manquant'})

    try {
        // Décode le token avec la clé secrète
        const decoded = jwt.verify(token,KEY)
        
        req.user = await User.findById(decoded.userId)

        next()
    }
    catch(err) {
        res.status(403).send({message: 'Token invalide'})
    }
}

module.exports = auth