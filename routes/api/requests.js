var express = require('express');
var Utils = require('util');
var router = express.Router();

function getMysql() {
    return require('../../confs/mysql');
}
/* GET home page. */
router.get('/', async function(req, res) {
    // pour sois afficher tout en meme temps sois afficher juste la demande specifque
    if (req.query.q === undefined){
        let query = Utils.promisify(getMysql().query).bind(getMysql());
        try {
            let result = await query('SELECT * FROM `requests`');
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
                tmp.push(objTmp);
            }
            res.json({
                status: true,
                result: tmp
            });
        } catch (e) {
            res.json({
                status: false,
                message: e.message
            })
        }
        return;
    }
    res.json({
        status: false,
        message: 'Aucun résultat trouvé'
    });
});

module.exports = router;
