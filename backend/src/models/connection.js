const mysql = require('mysql2/promise')

const connectionDois = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12345678',
    database: process.env.DB_NAME || 'boteco_brasil',

});

module.exports = connectionDois