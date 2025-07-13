var express = require('express');
var router = express.Router();
var db = require('../config/db'); // Assuming you have a database configuration file
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup', { title: 'Signup' }); // Render signup page
});

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
      res.send('User saved successfully!');
    });
  });
});

module.exports = router;
