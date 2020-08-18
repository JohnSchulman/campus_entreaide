var express = require('express');
var router = express.Router();

function getMysql() {
    return require('../../confs/mysql');
}
/* GET home page. */
router.get('/', function(req, res) {
    // pour sois afficher tout en meme temps sois afficher juste la demande specifque
    if (req.query.q === undefined){
        getMysql().query('SELECT * FROM `requests`', (error, result)=>{
            if(!error){
                let tmp = [];
                // comme on fait un select on recupère plusieurs ligne et donc on doit bouclé
                for (let key of result){
                    let objTmp = result[key];
                    let line = result[key];
                    console.log(line);
                    let table_name = line.service_type === 0 ? 'service_object' : 'service_service';
                    getMysql().query('SELECT * FROM `'+ table_name+'` WHERE `request_id` = '+ line.id, (error, result)=>{
                        if(!error){
                            if (result.length > 0) {
                                objTmp.service = result[0];
                            }
                        }
                    });
                    tmp.push(objTmp);
                }
                console.log(tmp);
                res.json(tmp);
            }
        });
    }
    res.json({});
});

module.exports = router;
