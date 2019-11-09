var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'campus_entreaide'
});

connection.connect();

if(connection) {
    console.log('connection is ok');
}