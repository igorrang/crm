const express = require('express');
const router = express.Router();
const { getAllClientes ,getClientsandOrigem, sumClientes, sumAllClients} = require('../models/rotinaLeadsModels');

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



router.get('/clientes/origem', async (req,res) =>{
    try{
        const clientes = await getClientsandOrigem();
        if(clientes.length === 0){
            return res.status(404).json({message: 'Nenhum cliente encontrado'});
        }
        res.json(clientes);
    } catch (error){
        res.status(500).json({message: 'Erro ao buscar clientes', error: error.message});
    }
})

router.get('/clientes/soma-id', async (req, res) => {
    try {
        const totalIdClientes = await sumClientes();
        res.json({ total_id_clientes: totalIdClientes });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao somar id_cliente', error: error.message });
    }
});

router.get('/')

module.exports = router;