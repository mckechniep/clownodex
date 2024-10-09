const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

//router logic
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    res.render("contacts/index.ejs", { contacts: user.contacts });
  } catch (error) {
    console.log(error);
    res.redict("/");
  }
});

router.get("/new", (req, res) => {
  res.render("contacts/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // applications array of the current user
    currentUser.contacts.push(req.body);
    console.log(currentUser);
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/contacts`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect("/");
  }
});

router.get("/", async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Render index.ejs, passing in all of the current user's
    // applications as data in the context object.
    res.render("contacts/index.ejs", {
      contacts: currentUser.contacts,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:contactId", async (req, res) => {
    const user = await User.findById(req.session.user._id);
    const contact = user.contacts.id(req.params.contactId);
  res.render("contacts/show.ejs", { contact });
});

module.exports = router;
