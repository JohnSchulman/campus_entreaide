var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function (req, res) {
  res.render('login/index');
});

module.exports = router;