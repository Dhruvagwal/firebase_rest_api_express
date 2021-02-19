require('dotenv').config();

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const express = require("express");
const app = express();

app.use(bodyParser.json());

//Authentication
const userService = require('./firebase')

module.exports = app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
      await userService.authenticate(email, password);
      const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECERT)
      res.json({accessToken})
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });