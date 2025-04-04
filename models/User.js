const mongoose = require('mongoose')
const bcryptjs =  require('bcryptjs')

const userSchema = new mongoose.Schema({
    name : string ,
    email : {type: String, unique:true, require:true},
    password : string,
    role : { type:String,enum: ['admin','professionel','client'] ,default:'client'}
})

//Crypter le mot de passe
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 10)
    }
    next()
})

//comparer le mot de passe
userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)