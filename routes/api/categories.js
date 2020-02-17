var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    getMysql().query('SELECT * FROM `categories` WHERE title="' + req.body.title + '" AND image="' + req.body.image + '"',
        function (error, results, fields) {
            // fonction qui gère les résultats de la requête
            if(error) {
                res.json({
                    status: false,
                    message: error
                });
            } else if(results !== undefined && results.length === 0) {
                res.json({
                    status: false,
                    message: 'autocompletion utilisés est incorrects'
                });
            } else {
                req.session.user = results[0];
                res.json({
                    status: true
                });
            }
        });
});




module.exports = router;
