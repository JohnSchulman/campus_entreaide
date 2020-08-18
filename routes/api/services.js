var express = require('express');
var router = express.Router();

function getMysql() {
    return require('../../confs/mysql');
}

router.post('/', function (req, res) {
    // toutes les information qu'on a envoyé
    let budget = parseInt(req.body.budget);
    let description = req.body.description;
    let category = req.body.category;
    let creation_date = req.body.creation_date;
    let time = req.body.time;
    let title = req.body.title;
    let type = req.body.type;

    function addServiceInDb({title, description, category, budget, creation_date, time, type}) {
        let me = req.session.user;
        if (me !== undefined) {
            console.log('SELECT `id` FROM `categories` WHERE `title` = "' + category + '"');
            getMysql().query('SELECT `id` FROM `categories` WHERE `title` = "' + category + '"', (error, result, field) => {
             //   req.session.user = result[0];
                console.log(result);

                if (result.length !== 0) {
                    getMysql().query('INSERT INTO `requests`(`id_user`, `title`, `id_categorie`, `creation_date`, `opinion`, `description`, `city`, `service_type`) VALUES ' +
                        '("' + parseInt(me.id) + '", "' + title + '", "' + result[0].id + '", "' + creation_date + '", 0, "' + description + '", "Antibes", "' + type + '")',
                        (error, result, field) => {
                            if (error) {
                                res.json({
                                    status: false,
                                    message: error
                                });
                            } else {
                                if (req.body.type === 0) {
                                    getMysql().query('INSERT INTO `service_object`(`request_id`, `time`, `budget`, `service_type`)' +
                                        ' VALUES (' + result.insertId + ', "' + time + '", "' + budget + '", "0")',
                                        (error, result, field) => {
                                            if (error) {
                                                res.json({
                                                    status: false,
                                                    message: error
                                                })
                                            } else {
                                                res.json({
                                                    status: true,
                                                    Objects: {
                                                        // la propriete + valeur (en variable qui contient la description)
                                                        //description: description,
                                                        // raccourcie si proprriété et valeur sont identique
                                                        description,
                                                        category,
                                                        creation_date,
                                                        title,
                                                        time,
                                                        budget,
                                                    }
                                                })
                                            }
                                        })
                                } else if (req.body.type === 1) {
                                    getMysql().query('INSERT INTO `service_service`(`request_id`, `budget_type`, `budget`)' +
                                        ' VALUES (' + result.insertId + ', "1", "' + budget + '")',
                                        (error, result, field) => {
                                            if (error) {
                                                res.json({
                                                    status: false,
                                                    message: error
                                                })
                                            } else {
                                                res.json({
                                                    status: true,
                                                    Services: {
                                                        description,
                                                        category,
                                                        creation_date,
                                                        title,
                                                        budget,
                                                    }
                                                });
                                            }
                                        })
                                }

                            }
                        });
                } else {
                    res.json({
                        status: status
                    })
                }
            });
        }else {
            res.json({
                status: false,
                type: "redirect"
            });
            // soit la redirection sois status false
            /// res.redirect('/login');
            //window.location.href = '/login';
        }
    }

    addServiceInDb({title, description, category, budget, creation_date, time, type});
});

module.exports = router;
