var express = require('express');
var router = express.Router();

function getMysql() {
    return require('../../confs/mysql');
}

// :title ou :serviced_type = sont des variable qui vont prendre lal valeurs des valeurs de la requète
router.get('/autocompletion/:service_type/:title', function (req, res) {
    // requette sql pour récupérer dans la table categories, la categorie qu'on cherche
    // "LIKE" permet d'avoir plusieurs résultats et le "%" permet de trouver les résultats qui commence par les premiers lettres
    getMysql().query('SELECT * FROM `categories` WHERE title LIKE "' + req.param('title') + '%" AND `Catégorie_type`=' + req.param('service_type'),
        function (error, results, fields) {
        // fonction qui gère les résultats de la requête
            if(error) {
                res.json({
                    status: false,
                    message: error
                });
            } else {
                // on cree un tableau vide
                let tmp = [];
                // on boucle sur les résultats
                for(let r of results) {
                    // on les met dans le tableau
                    // comme append mais en js
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
