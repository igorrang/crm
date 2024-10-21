const mysql = require('mysql2/promise')

const connection = await mysql.createConnection({
    host: 'db', // normalmente 'database' se estiver no mesmo Docker Network
    user: 'phpmyadmin',
    password: '441e4afe56ca1a600e3ff860e6621633',
    database: 'boteco_brasil'
})

// console.log(mysql)
// console.log(connection)

module.exports = connection