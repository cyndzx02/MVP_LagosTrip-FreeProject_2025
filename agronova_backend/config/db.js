const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: 'agronova'
});

connection.connect(function(err) {
    if (err) {
        console.error('Cannot be connected' + err.stack);
        return ;
    }
    console.log('Connexion successfully as id' + connection.threadId);
});

module.exports = connection;