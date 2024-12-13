const mysql = require('mysql2/promise')
// goes to env 
const connection = mysql.createPool({
    host: 'localhost',// env 
    user: 'phpmyadmin', // docker / env 
    password: '441e4afe56ca1a600e3ff860e6621633', // docker / env 
    database:'boteco_brasil' // env 
})

// console.log(mysql)
// console.log(connection)

module.exports = connection