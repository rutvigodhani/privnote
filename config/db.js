require('dotenv').config()
const mysql2 = require('mysql2')

var connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

module.exports = connection.promise();
