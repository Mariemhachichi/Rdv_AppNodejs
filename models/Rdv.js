const mongoose = require('mongoose')

const RdvSchema = new mongoose.Schema({
    date:{type:date, required:true},
    professional:{type: mongoose.Schema.Types.ObjectId,ref :'User',required:true},
    client : {},
    status:{}
})