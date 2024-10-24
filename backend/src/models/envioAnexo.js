const GuardaVolume = require('volume')
const connection = require('./connection')

anexo.GET = (GuardaVolume) => {
    const {id_cliente} = GuardaVolume
    const sql = `SELECT * FROM deposito WHERE id_cliente='${id_cliente}' `
    const [query] = connection.execute(sql)
    return query


}