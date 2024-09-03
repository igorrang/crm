const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'Mac-mini-de-igor.local',
    user: 'root',
    password: '12345',
    database:'PlanilhaExcel'
})

module.exports = connection