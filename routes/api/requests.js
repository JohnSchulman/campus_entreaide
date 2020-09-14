var express = require('express');
var Utils = require('util');
var router = express.Router();

function getMysql() {
    return require('../../confs/mysql');
}

//'SELECT * FROM `requests`'
async function getRequests(main_query){
    let query = Utils.promisify(getMysql().query).bind(getMysql());
    try {
        let result = await query(main_query);
        let tmp = [];
        // comme on fait un select on recupère plusieurs ligne et donc on doit bouclé
        for (let line of result) {
            let objTmp = line;
            let table_name = line.service_type === 0 ? 'service_object' : 'service_service';

            const _result = await query('SELECT * FROM `' + table_name + '` WHERE `request_id` = ' + line.id);
            if (Object.keys(_result).length > 0) {
                objTmp.service = JSON.parse(JSON.stringify(_result[0]));
            }
            objTmp = JSON.parse(JSON.stringify(objTmp));
            //
            tmp.push(objTmp);
        }
        return {
            status: true,
            result: tmp
        };
    } catch (e) {
       return {
            status: false,
            message: e.message
        }
    }
}
/* GET home page. */
router.get('/', async function(req, res) {
    // pour sois afficher tout en meme temps sois afficher juste la demande specifque
    if (req.query.q === undefined){

        getRequests('SELECT * FROM `requests`').then(json => {
            // raccourcie pour ce qui est en bas
            //  permet d'afficher les return
            res.json(json);
        });
        return;
    }
    res.json({
        status: false,
        message: 'Aucun résultat trouvé'
    });
});

router.get('/mine', async function(req, res){
    let user = req.session.user;
    if (req.query.q === undefined && user !== undefined){
        getRequests('SELECT * FROM `requests` WHERE  `id_user` = ' + user.id).then(json => {
            // raccourcie pour ce qui est en bas
            //  permet d'afficher les return
            res.json(json);
        });
        return;
    }
    res.json({
        status: false,
        message: 'Vous n\'avez créé aucune demande'
    });
});

router.get('/:category_id', async function(req, res){
    let category_id = req.param("category_id");
    if (req.query.q === undefined){
        getRequests('SELECT * FROM `requests` WHERE `id_categorie` = ' + category_id).then(json => {
            // raccourcie pour ce qui est en bas
            //  permet d'afficher les return
            res.json(json);
        });
        return;
    }
    res.json({
        status: false,
        message: 'Aucun résultat trouvé'
    });
});

module.exports = router;
