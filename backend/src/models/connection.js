const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '6ee292f7b73eacc4d0ff1d53e18f2627',
    database:'boteco_brasil'
})

module.exports = connection