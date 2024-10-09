const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("auth/register.ejs");
});

router.post("/register", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("User already exists");
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.send("Welcome");

});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
if (!userInDatabase) {
  return res.send("Login failed, please try again.");
}
const validPassword = bcrypt.compareSync(
  req.body.password,
  userInDatabase.password
)
if (!validPassword) {
  return res.send("Login failed, please try again.");
}
req.session.user = {
  username: userInDatabase.username,
  _id: userInDatabase._id,
};
res.redirect("/");
});

router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});



module.exports = router;





















  