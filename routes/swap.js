var express = require('express');
var router = express.Router();
var swapController = require('../controllers/swapController');


router.get('/', function(req, res, next) {
  res.render('swap/index', { title: 'Face Swap', outputImage: null });
});

router.post('/change', swapController.swapFaces);

module.exports = router;