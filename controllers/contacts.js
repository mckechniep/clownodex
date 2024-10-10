const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

//router logic
//index route
router.get("/", async (req, res) => {
//attempts to find the current user using ID stored in the session
    try {
    const user = await User.findById(req.session.user._id);
//if user is found, displays the user's contacts 
    res.render("contacts/index.ejs", { contacts: user.contacts });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//route handle for GET request to /new endpoint. Listens for GET requests to the /new path.
router.get("/new", (req, res) => {
  //render the new.ejs template, HTML form for creating a new contact
    res.render("contacts/new.ejs");
});

// router adding new contact to users list of contacts and then redirect to see all contacts
router.post("/", async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // contacts array of the current user
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

// Create route , could use post here?
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
