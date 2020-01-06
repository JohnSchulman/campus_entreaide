var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// controller pour la partie login
router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/register', function (req, res) {
  res.render('register');
});

/* GET demande page. */
router.get('/demande', function(req, res) {
  res.render('demande');
});

module.exports = router;
