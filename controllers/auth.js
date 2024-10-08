const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("auth/register");
});