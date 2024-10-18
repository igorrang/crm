const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'db', // Nome do serviço do banco de dados no docker-compose.yml
    user: process.env.MYSQL_USER, // Variável de ambiente para o usuário
    password: process.env.MYSQL_PASSWORD, // Variável de ambiente para a senha
    database: 'boteco_brasil' 
})

// console.log(mysql)
// console.log(connection)

module.exports = connection