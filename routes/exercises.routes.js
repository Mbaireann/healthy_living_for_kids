const express = require("express");
const router = express.Router();
const axios = require("axios");


router.get('/all',(req,res)=>{
  res.render('exercises',{doc:res.locals.user})
})

module.exports =router