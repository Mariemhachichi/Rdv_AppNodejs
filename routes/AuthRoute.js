const express = require('express')
const jwt = require('jsonwebtoken')
const user = require('../models/User')
const router = express.Router()

const SECRET_KEY = process.env.SECRET_KEY

//inscription utilisateur 
router.post('/register', async(req, req)=>{
    try{
        const {name,email,password,role} = req.body
        const user = new User({name,email,password})
        await user.save()
        res.status(201).send({message:"user saved",user})
    }catch(error){
        res.status(500).send({message:error.message})
    }
})

//conexion
router.post('/login', async(req,res)=>{
    try{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (!user){
        res.status(404).send({message:'user not found'})
    }
    const HavePass = user.comparePassword(password)
    if(!HavePass){
        res.status(400).send({message:'invalid password !!'})
    }
    const token = await jwt.sign({userId:user._id},SECRET_KEY)
    res.send({message:'user logged',token})
} catch(error){
    res.status(400).send({message:error.message})
}
})

module.exports = router