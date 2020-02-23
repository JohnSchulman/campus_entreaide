var express = require('express');
var router = express.Router();

function getMysql() {
    return require('../../confs/mysql');
}

// router.get('/autocompletion/', function(req, res) {
//     res.json({
//         status: true,
//         categories: []
//     })
// });

router.get('/autocompletion/:service_type/:title', function (req, res) {
    // requette sql pour récupérer dans la table categories, la categorie qu'on cherche
    getMysql().query('SELECT * FROM `categories` WHERE title LIKE "' + req.param('title') + '%" AND `Catégorie_type`=' + req.param('service_type'),
        function (error, results, fields) {
        // fonction qui gère les résultats de la requête
            if(error) {
                res.json({
                    status: false,
                    message: error
                });
            } else {
                //req.autocompletion = results[0];
                let tmp = [];
                for(let r of results) {
                    tmp.push({id: r.id, title: r.title, image: r.image});
                }
                res.json({
                    status: true,
                    categories: tmp
                });
            }
        });
});

module.exports = router;
