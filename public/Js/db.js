const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: ''
});

MediaQueryList.exports = pool.promise();