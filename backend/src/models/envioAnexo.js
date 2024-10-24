const connection = require('./connection');

const getClienteById = async (id_cliente) => {
    const sql = `SELECT * FROM deposito WHERE id_cliente='${id_cliente}'`;
    const [rows] = await connection.execute(sql);
    return rows;
};

module.exports = { getClienteById };