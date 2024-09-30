const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'Mac-mini-de-igor.local',
    user: 'root',
    password: '12345',
    database:'botecobrasil'

   // host: process.env.DB_HOST,
   // user: process.env.DB_USER,
   // password: process.env.DB_PASSWORD,
   // database: process.env.DB_DATABASE
})

module.exports = connection