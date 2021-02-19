require('dotenv').config();

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();

app.use(bodyParser.json());

module.exports = (req, res, next) =>{
  const authHeaders = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1]
  if (token == null) return res.status(401).send('Error1')
  jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, user) =>{
    if(err) return res.status(403).send('Error2')
    req.user = user
    next()
  })
}