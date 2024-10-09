// const express = require("express");
// const User = require("../models/user.js");
// const bcrypt = require("bcrypt");
// const router = express.Router();

// router.get("/register", (req, res) => {
//   res.render("auth/register.ejs");
// });

// router.post("/register", async (req, res) => {
//   const userInDatabase = await User.findOne({ username: req.body.username });
//   if (userInDatabase) {
//     return res.send("User already exists");
//   }
//   if (req.body.password !== req.body.confirmPassword) {
//     return res.send("Passwords do not match");
//   }

//   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//   req.body.password = hashedPassword;

//   const user = await User.create(req.body);
//   res.send("Welcome");

// });

// router.get("/sign-in", (req, res) => {
//   res.render("auth/sign-in.ejs");
// });

// router.post("/sign-in", async (req, res) => {
//   const userInDatabase = await User.findOne({ username: req.body.username });
// if (!userInDatabase) {
//   return res.send("Login failed, please try again.");
// }
// const validPassword = bcrypt.compareSync(
//   req.body.password,
//   userInDatabase.password
// )
// if (!validPassword) {
//   return res.send("Login failed, please try again.");
// }
// req.session.user = {
//   username: userInDatabase.username,
//   _id: userInDatabase._id,
// };
// res.redirect("/");
// });

// router.get("/sign-out", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });



// module.exports = router;





///

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

router.get('/register', (req, res) => {
  res.render('auth/register.ejs');
});

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/register', async (req, res) => {
  try {
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }
  
    // Username is not taken already!
    // Check if the password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and Confirm Password must match');
    }
  
    // Must hash the password before sending to the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
  
    // All ready to create the new user!
    await User.create(req.body);
  
    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    // First, get the user from the database
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Login failed. Please try again.');
    }
  
    // There is a user! Time to test their password with bcrypt
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }
  
    // There is a user AND they had the correct password. Time to make a session!
    // Avoid storing the password, even in hashed format, in the session
    // If there is other data you want to save to `req.session.user`, do so here!
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    };
  
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;

















  