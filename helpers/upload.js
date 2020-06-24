const formidable = require("formidable");
const fs = require('fs');

module.exports = function (req, destination, onError, onSuccess) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err) {
            onError(0, err);
        }
        // à trouver ce bout de code sur internet
        let avatar = files.avatar;
        let oldpath = avatar.path;
        let newpath = __dirname + '/../public/images/avatars/' + avatar.name.replace(/\ /g, '_');

        fs.rename(oldpath, newpath, err => {});

        if(fs.existsSync(newpath)) {
            // chemin vers l'url de l'avatar
            onSuccess('/images/avatars/' + avatar.name);
        }
        else {
            onError(1, 'L\'upload s\'est mal passé !');
        }
    });
};
