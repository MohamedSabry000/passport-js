const express = require('express');
const router = express.Router();

// Login
router.get('/login', (req, res) => res.render('login'));

// Register
router.get('/register', (req, res) => res.render('register') );

// Register
router.get('/dashboard', (req, res) => res.render('dashboard') );

module.exports = router;