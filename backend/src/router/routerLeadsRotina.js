const express = require('express');
const router = express.Router();
const { getAllClientes } = require('../models/rotinaLeadsModels');

router.get('/clientes', async (req, res) => {
    try {
        const clientes = await getAllClientes();
        if (clientes.length === 0) {
            return res.status(404).json({ message: 'Nenhum cliente encontrado' });
        }
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
    }
});

module.exports = router;