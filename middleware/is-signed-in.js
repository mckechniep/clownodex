
/* The function checks if there’s a user object in 
the session (provided by req.session.user).
This is typically used to confirm that a user is logged in. */


// Acts as a guard/gate for protected routes
// Redirects to sign-in if no user is in session
// Used to protect routes that require authentication
// Blocks unauthorized access


const isSignedIn = (req, res, next) => {
if (req.session.user) return next();
res.redirect('auth/sign-in');
}
module.exports = isSignedIn;

