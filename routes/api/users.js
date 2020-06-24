var express = require('express');
var router = express.Router();
const fs = require('fs');
// module trouver sur internet
var multer  = require('multer');

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
        res.json({
            status: true,
            me: me
        });
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
                    status: false,
                    message: error
                });
            } else if(results !== undefined && results.length === 0) {
                res.json({
                    status: false,
                    message: 'Les identifiants utilisés sont incorrects'
                });
            } else {
                req.session.user = results[0];
                res.json({
                    status: true
                });
            }
        });
});

// middleware qui permet d'uploader une image trouver sur internet
var upload = multer({ dest: __dirname + '/../../public/images/avatars/' });
router.post('/register', upload.single('avatar'), function (req, res) {
    // toutes les information qu'on a envoyé
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let address = req.body.address;

    // extraction des prorpiété req.file utlisé
    // alternative car comme au dessus ca le processeur mettez undefined
    const {path, filename, originalname} = req.file;
    // on a juste stocker un string dans une variable
    // on prepare le path
    // le premiere replace remplace les chiffree en bruce_lee.png
    // 2eme replace c'est pour l'expression
    const avatar_path = path.replace(filename, originalname.replace(/\ /g, '_'));

    // premiere parametre c'est l'ancien path et le deuxième c'est le nouveau
    // ici je passe le path en paramtere grace a fs on renomme le fichier
    fs.rename(path, avatar_path, function (err) {
        if (err) {
            res.json({
                status: false,
                message: err
            })
        }
        if (!err) {
            getMysql().query('SELECT id FROM `users` WHERE email="' + email + '"',  (error, results, fields) => {
                if (error) {
                    res.json({
                        status: false,
                        message: error
                    });
                } else {
                    if (results.length > 0) {
                        res.json({
                            status: false,
                            message: 'L\'email que vous avez saisie est déjà utilisé !'
                        })
                    } else {
                        getMysql().query('INSERT INTO `users`(`first_name`, `last_name`, `email`, `password`, `avatar`, `opinon`, `is_checked`, `address`, `real_time_alert`) ' +
                            '                  VALUES ("' + firstName + '", "' + lastName + '", "' + email + '", "' + password + '", "' + avatar_path.replace(/\\/g, '/') + '", 0, TRUE, "' + address + '", 0)',
                            (error, results, field) => {
                                if (error) {
                                    res.json({
                                        status: false,
                                        message: error
                                    });
                                } else {
                                    res.json({
                                        status: true,
                                        user: {
                                            firstName,
                                            lastName,
                                            email,
                                            address,
                                            opinion: 0,
                                            is_checked: true,
                                            real_time_alert: false,
                                            avatar: avatar_path
                                        }
                                    });
                                }
                            });
                    }
                }
            });

        }
    });
});

module.exports = router;
