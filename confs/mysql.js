var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'campus_entreaide'
});

connection.connect();

// export la connexion sql pour qu'on puisse l'utiliser
module.exports = connection;