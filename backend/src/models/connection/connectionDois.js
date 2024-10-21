//const mysql = require('mysql2/promise')
const { Pool } = require('pg');
const connectionDois = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '12345678',
    database: process.env.DB_NAME || 'botecobrasil',
    port: process.env.DB_PORT || 5332,
});

module.exports = connectionDois