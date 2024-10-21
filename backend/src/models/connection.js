const mysql = require('mysql2/promise')

const connection = await mysql.createConnection({
    host: 'localhost', // normalmente 'database' se estiver no mesmo Docker Network
    user: 'root',
    password: '',
    database: 'boteco_brasil'
})

// console.log(mysql)
// console.log(connection)

module.exports = connection