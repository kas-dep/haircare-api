
var mysql = require('mysql');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    timezone: 'utc',
});

connection.connect((err) => {
    if (err) throw err;
    console.log("mysql connected");
});

connection.on('error', () => {
    console.log('ERROR');
});

module.exports = connection;
