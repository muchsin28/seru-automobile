require('dotenv').config()
const express = require('express')
const router = require('./router')
const {sequelize} = require('./config/db')
const PORT = Number(process.env.PORT) || 3000
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',router)

app.listen(PORT,()=>{
  console.log('App Listen to: ', PORT)
})

const dbConnect = async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully...✅ -> 💻 ');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

dbConnect()

