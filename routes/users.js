var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const User = require("../models/users");

const { checkBody } = require("../modules/checkBody");

router.post("/signup", async (req, res) => {
  try {
    if (!checkBody(req.body, ["name", "email", "password"])) {
      return res.json({ result: false, error: "Missing or empty fields" });
    }
    const userData = await User.findOne({ email: req.body.email });
    if (userData !== null) {
      return res.json({ result: false, error: "User already exists" });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const newDoc = await newUser.save();
    res.json({ result: true, user: newDoc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    if (!checkBody(req.body, ["email", "password"])) {
      return res.json({ result: false, error: "Missing or empty fields" });
    }
    const userData = await User.findOne({ email: req.body.email });
    if (userData === null) {
      return res.json({ result: false, error: "User not found" });
    }
    res.json({ result: true, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
