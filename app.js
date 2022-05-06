require('dotenv').config()
const express = require('express')
const router = require('./router')
const PORT = Number(process.env.PORT) || 3000
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',router)

app.listen(PORT,()=>{
  console.log('App Listen to: ', PORT)
})
