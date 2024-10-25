const { sumClientes, sumAllClients, getAllClientes, getClientsandOrigem } = require('../models/rotinaLeadsModels');


const getAllClientesController = async (req, res) => {
    try {
        const clientes = await getAllClientes();
        const soma = await sumAllClients()
        res.status(200).json({clientes,soma});
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Erro ao buscar clientes' });
    }
};

const getClientsandOrigemController = async (req, res) => {
    try {
        const clientes = await getClientsandOrigem();
        const totalIdClientes = await sumClientes();
        res.status(200).json({ clientes, total_id_clientes: totalIdClientes });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Erro ao buscar cliente e origens', error: err.message });
    }
};

module.exports = {
    getAllClientesController,
    getClientsandOrigemController
};