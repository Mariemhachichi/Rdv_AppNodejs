const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

const SECRET_KEY = process.env.SECRET_KEY

//inscription utilisateur 
router.post('/register', async(req, res)=>{
    try{
        const {name,email,password,role} = req.body
        const user = new User({name,email,password,role})
        await user.save()
        return   res.status(201).send({message: "User saved", user})
    }catch(error){
        return    res.status(500).send({message:error.message})
    }
})

//conexion
router.post('/login', async(req,res)=>{
    try{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (!user){
        return   res.status(404).send({message:'user not found'})
    }
    const isValid =await user.comparePassword(password)
    if(!isValid){
        return  res.status(400).send({message:'invalid password !!'})
    }
    const token = await jwt.sign({userId:user._id},SECRET_KEY)
    return   res.send({message:'user logged',token})
} catch(error){
    return res.status(400).send({message:error.message})
}
})

module.exports = router