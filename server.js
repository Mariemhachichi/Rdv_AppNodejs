const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/AuthRoute')
const rdvRoute = require('./routes/RdvRoute')


const Port = process.env.PORT|| 9000

const app = express()
app.use(express.json())

app.use('/', authRoute)
app.use('/',rdvRoute)

mongoose.connect(process.env.URL_BD).then(()=>{
    console.log("connect to BD")
}).catch(err=>{
    console.error("Database connection error:", err)
})

app.listen(Port,()=>{
    console.log("Server started !!")
})
