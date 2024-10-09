const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//router logic
router.get('/', async (req, res) => {
    try {
        res.render('contacts/index.ejs');
    } catch (error) {
        console.log(error);
        res.redict('/');
    }
    });

router.get('contactId', (req, res) => {
    res.send(`here is your request param: ${req.params.contactId}`);
});

module.exports = router;