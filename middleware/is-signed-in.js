const isSignedIn = (req, res, next) => {
if (req.session.user) return next();
res.redict('auth/sign-in');
}
module.exports = isSignedIn;

//The function checks if there’s a user object in 
//the session (provided by req.session.user). 
//This is typically used to confirm that a user is logged in.