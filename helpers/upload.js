const formidable = require("formidable");

module.exports = function (req, destination, onError, onSuccess) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err) {
            onError(0, err);
        }
        // à trouver ce bout de code sur internet
        let avatar = files.avatar;
        let oldpath = avatar.path;
        let newpath = __dirname + '/../../public/images/avatars/' + avatar.name;
        fs.renameSync(oldpath, newpath);

        if(fs.existsSync(newpath)) {
            // chemin vers l'url de l'avatar
            onSuccess('/images/avatars/' + avatar.name);
        }
        else {
            onError(1, 'L\'upload s\'est mal passé !');
        }
    });
};