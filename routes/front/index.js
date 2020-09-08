var express = require('express');
var router = express.Router();

// routes cote Front qui permet de afficher les pages cote front
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// controller pour la partie login
router.get('/login', function (req, res) {
  res.render('login');
});

// controller pour la partie register
router.get('/register', function (req, res) {
  res.render('register');
});

// controlleur pour la partie mon compte
router.get('/account', function (req, res) {
  res.render('account');
});

/* GET demande page. */
router.get('/demande', function(req, res) {
  res.render('demande');
});

/* GET demande page. */
router.get('/demande/:category_id', function(req, res) {
  res.render('demande', {category_id: req.param('category_id')});
});

module.exports = router;
