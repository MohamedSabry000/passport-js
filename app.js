const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routes');
const usersRoutes = require('./routes/users');
const passport = require('passport');

const flash = require('connect-flash');
const session = require('express-session');

// MongoDB
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



const app = express();
app.use('/static', express.static(__dirname + '/public'));
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');



// Body Parser
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


const PORT = process.env.PORT || 5000;


//Routes
app.use('/', routes);

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
