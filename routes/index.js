var express = require('express');
var router = express.Router();
// var db = require('../config/db');
const { GoogleGenAI } = require("@google/genai");

// const jwt = require('jsonwebtoken');
// const { isAuthenticated } = require('../middleware/authMiddleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Route to test database connection
// router.get('/db-test', function(req, res) {
//   db.query('SELECT 1', function(err, results) {
//     if (err) {
//       res.status(500).send('Database connection failed: ' + err.message);
//     } else {
//       res.send('Database connected successfully!');
//     }
//   });
// });


//route to the chatbox
// router.get('/chatbox', isAuthenticated, (req, res, next) => {
//   return res.render('chatbox', {title: 'Chatbox', messages: []});
// });




// Route to handle chatbox message sending
// router.post('/chatbox-send', async function(req, res) {
//   // Validate the incoming message
//   if (!req.body || !req.body.message) {
//     return res.status(400).send('Message is required');
//   }
//   const message = req.body.message;

//   // The client gets the API key from the environment variable `GEMINI_API_KEY`.
//   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: message,
//     });
//     res.render('chatbox', {title: 'Chatbox', messages: response.text}); // Render chatbox with the AI response
//     // res.send(`Message received: ${response.text}`);
//   } catch (err) {
//     res.status(500).send('AI error: ' + err.message);
//   }
// });

module.exports = router;
