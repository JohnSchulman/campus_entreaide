var express = require('express');
var router = express.Router();
const fs = require('fs');
const upload = require('../../helpers/upload');
const formidable = require('formidable');

function getMysql() {
    return require('../../confs/mysql');
}

/* GET home page. */
router.get('/me', function(req, res) {
    let me = req.session.user;
    if(me === undefined) {
        res.json({
            status: false,
            message: "Vous n'êtes pas loggé !"
        });
    } else {
        delete me['password'];
        res.json(me);
    }
});

router.get('/logout', function (req, res) {
    delete req.session.user;
    let status;
    if(req.session.user === undefined) {
        status = true;
    } else {
        status = false;
    }
    res.json({
        status: status
    })
});

router.post('/login', function (req, res) {
    // requette sql pour récupérer dans la table users, le user qui cherche à s'identifier
    getMysql().query('SELECT * FROM `users` WHERE email="' + req.body.email + '" AND password="' + req.body.password + '"',
        function (error, results, fields) {
        // fonction qui gère les résultats de la requête
            if(error) {
                res.json({
                    status: false
                });
            } else {
                req.session.user = results[0];
                res.json({
                    status: true
                });
            }
        });
});

router.post('/register', function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let address = req.body.address;

    upload(req, __dirname + '/../../public/images/avatars/', function (code, msg) {
        switch (code) {
            case 0:
            case 1:
            default:
                res.json({
                    status: false
                });
        }
    }, function () {
        res.json({
            status: true
        });
    });

    // getMysql().query('', function(error, results, fields) {
    //
    // });
});

module.exports = router;
