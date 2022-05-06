const router = require('express').Router()
const db = require('../models')

router.get('/', (req,res)=> {
  console.log("db")
  res.send(`SERU Autombile API-v.${process.env.APP_VERSION}`)
})

module.exports = router