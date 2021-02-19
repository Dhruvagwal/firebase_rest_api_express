const bodyParser = require("body-parser");

const express = require("express");
app = express();

app.use(bodyParser.json());

//Authentication
const userService = require('./firebase')

module.exports = app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userService.authenticate(email, password);
      res.json(user);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });