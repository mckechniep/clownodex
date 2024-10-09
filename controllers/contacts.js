const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

//router logic
//index route
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);

    res.render("contacts/index.ejs", { contacts: user.contacts });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//new route
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

//create route ? post?
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

//show route
router.get("/:contactId", async (req, res) => {
    const user = await User.findById(req.session.user._id);
    const contact = user.contacts.id(req.params.contactId);
  res.render("contacts/show.ejs", { contact });
});

// Edit route
router.get("/:contactId/edit", async (req, res) => {
    const user = await User.findById(req.session.user._id);
    const contact = user.contacts.id(req.params.contactId);
    res.render("contacts/edit.ejs", { contact });
  });

  
// Update route
router.put("/:contactId", async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);
      const contact = user.contacts.id(req.params.contactId);
      Object.assign(contact, req.body);
      await user.save();
      res.redirect(`/users/${user._id}/contacts/${contact._id}`);
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });



// Delete route
router.delete("/:contactId", async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);
      user.contact = user.contacts.filter(contact => contact._id.toString() !== req.params.contactId);
      await user.save();
      res.redirect(`/users/${user._id}/contacts`);
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });


module.exports = router;
