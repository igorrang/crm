//const mysql = require('mysql2/promise')
const { Pool } = require('pg');
const connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '12345678',
    database:'botecobrasil',
    port: 5332,
});

module.exports = connection