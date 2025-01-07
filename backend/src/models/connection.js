const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database:'boteco_brasil'
})

// console.log(mysql)
// console.log(connection)

module.exports = connection