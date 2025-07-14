var express = require('express');
var router = express.Router();
var db = require('../config/db'); // Assuming you have a database configuration file
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Signup
router.get('/signup', function(req, res, next) {
  res.render('users/signup', { title: 'Signup' }); // Render signup page
});

//Save user
router.post('/save-user', function(req, res, next) {
  if(!req.body || !req.body.email || !req.body.password) {
    return res.status(400).send('Email and password are required');
  }

  const email = req.body.email;
  const name = req.body.name;
  const mobile = req.body.mobile;
  const plainPassword = req.body.password;
  const saltRounds = 10;

  bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
    if (err) {
      return res.status(500).send('Error hashing password: ' + err.message);
    }
    // Save user to the database after hashing password
    db.query('INSERT INTO users (email, password, name, mobile, created_at) VALUES (?, ?, ?, ?, NOW())', [email, hash, name, mobile], function(err, results) {
      if(err) {
        return res.status(500).send('Error saving user: ' + err.message);
      }
      req.flash('success', 'User registered successfully');
      res.redirect('/chatbox'); // Redirect to home page after successful signup
    });
  });
});


//Login
router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'Login' }); // Render login page
});

//Authenticate user
router.post('/authenticate', function(req, res, next) {
  if(!req.body || !req.body.email || !req.body.password) {
    return res.status(400).send('Email and password are required');
  }

  const email = req.body.email;
  const plainPassword = req.body.password;

  db.query('SELECT * FROM users WHERE email = ?', [email], function(err, results) {
    if(err) {
      return res.status(500).send('Error fetching user: ' + err.message);
    }
    if(results.length === 0) {
      return res.status(401).send('Invalid email or password');
    }

    const user = results[0];
    bcrypt.compare(plainPassword, user.password, function(err, isMatch) {
      if (err) {
        return res.status(500).send('Error comparing passwords: ' + err.message);
      }
      if (!isMatch) {
        return res.status(401).send('Invalid email or password');
      }

      // Generate JWT token
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true }); // Set token in cookie
      // Optionally, you can store user info in session or flash messages
      req.session.user = user; // Store user info in session
      req.flash('success', 'Login successful');
      res.redirect('/chatbox'); // Redirect to home page after successful login
    });
  });
});

module.exports = router;
