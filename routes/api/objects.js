var express = require('express');
var router = express.Router();


router.post('/', function (req, res) {
    let test = req.body;
    let duration = parseInt(req.body.duration) ;
    let budget = parseInt(req.body.budget);
    res.json({test, duration, budget});

    console.log(test);
});

module.exports = router;
