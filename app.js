const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');

const routes = require('./routes');
const usersRoutes = require('./routes/users');

const app = express();
app.use('/static', express.static(__dirname + '/public'));
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(passport.initialize());
// app.use(passport.session());


const PORT = process.env.PORT || 5000;


//Routes
app.use('/', routes);

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
