const connection = require('./connection');

const getAllClientes = async () => {
    try {
        const [rows] = await connection.execute('SELECT id_cliente, status, origem FROM `botecobrasil`.`cliente`');
        return rows;
    } catch (err) {
        console.error("Error:", err);
        throw new Error('Erro ao buscar clientes');
    }
};

const sumAllClients = async () => {
    try {
        const clients = await getAllClientes();
        const totalClients = clients.length;
        return totalClients;
    } catch (err) {
        console.error("Error:", err);
        throw new Error('Erro ao somar clientes');
    }
}

const getClientsandOrigem = async () =>{
    try{
        const[rows] = await connection.execute('SELECT id_cliente, origem FROM `botecobrasil`.`cliente`')
        return rows;
    } catch (err){
        console.error("Error:", err)
        throw new Error('erro ao buscar cliente e origems')
    }
}


const sumClientes = async () => {
    try {
        const clients = await getClientsandOrigem();
        const totalIdClientes = clients.length
        return totalIdClientes;
    } catch (err) {
        console.error("Error:", err);
        throw new Error('Erro ao somar id_cliente');
    }
};
module.exports = {
    getAllClientes,
    getClientsandOrigem,
    sumClientes,
    sumAllClients
};