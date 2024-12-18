import mysql from 'mysql2/promise'
export async function MySQL(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user:  'admin',
        database: 'botecobrasil',
        password:'12345678'
    })

    return connection
}
// goes to env 
