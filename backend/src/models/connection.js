const mysql = require('mysql2/promise')

const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOSTNAME ,  // Host do banco de dados
    user: process.env.MYSQL_USER ,  // Nome do usuário do MySQL
    password: process.env.MYSQL_ROOT_PASSWORD ,  // Senha do usuário MySQL
    database: process.env.MYSQL_DATABASE   
})

// console.log(mysql)
// console.log(connection)

module.exports = connection