const bodyParser = require("body-parser");

const express = require("express");
app = express();

app.use(bodyParser.json());

//Authentication
const userService = require('./firebase')

module.exports = app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userService.addUser(email, password);
      res.status(201).json(user);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });
