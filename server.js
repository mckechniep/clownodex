const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const authRoutes = require('./controllers/auth');

const port = process.env.PORT ? process.env.PORT : "3000";

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`connected to MongoDB ${mongoose.connection.name}`);
});

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

//Integrates session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory directly
app.use(express.static('public'));

//Instructs express to use the routes in the authController

app.use('/auth', authRoutes);

// Route for landing page
app.get('/', (req, res) => {
  res.render('landing', { user: req.session.user });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

