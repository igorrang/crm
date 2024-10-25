const connection = require('./connection');

const getAllClientes = async () => {
    try {
        const [rows] = await connection.execute('SELECT id_cliente FROM `botecobrasil`.`cliente`');
        return rows;
    } catch (err) {
        console.error("Error:", err);
        throw new Error('Erro ao buscar clientes');
    }
};

module.exports = {
    getAllClientes
};