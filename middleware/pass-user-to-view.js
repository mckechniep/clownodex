//This middleware provides us a shortcut to always pass the information of the logged in user to our requests final destination.

// Makes user data available to all views via res.locals
// Doesn't block or redirect
// Helps templates display user-specific content
// Eliminates repetitive user data passing in routes


const passUserToView = (req, res, next) => {
res.locals.user = req.session.user ? req.session.user : null;
next();
}

module.exports = passUserToView;