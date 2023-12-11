const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'baba123',
    password:'Toton@612'
});

module.exports = pool.promise();