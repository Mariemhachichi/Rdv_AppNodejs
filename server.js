const express = require('express')
const mongoose = require('mongoose')

const Port = process.env.Port

const app = express()
app.use(express.json())


mongoose.connect(process.env.URL_BD).then(()=>{
    console.log("connect to BD")
}).catch(err=>{
    console.loserg(err)
})

app.listen(Port,()=>{
    console.log("Server started !!")
})
