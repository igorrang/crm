const { postRotinaLeadsModels } = require('../models/rotinaLeadsModels');
const mostrarCliente = async (req, res) => {
    const { id_cliente } = req.params;
    try {
        const cliente = await postRotinaLeadsModels(id_cliente);
        if (cliente.length === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.status(200).json(cliente);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar cliente', error: err.message });
    }
};

module.exports = {
    mostrarCliente
}