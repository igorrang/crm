const fs = require('fs');
const path = require('path');
const { getClienteById } = require('../models/envioAnexo.js');

const armazenarConteudo = async (req, res) => {
    const { id_cliente, conteudo } = req.body;

    // Consulta ao banco de dados
    const rows = await getClienteById(id_cliente);

    if (rows.length === 0) {
        return res.status(404).send('Cliente não encontrado');
    }

    // Caminho do arquivo
    const filePath = path.join(__dirname, `../cliente_${id_cliente}.txt`);

    // Armazenar o conteúdo no arquivo
    fs.writeFile(filePath, conteudo, (err) => {
        if (err) {
            return res.status(500).send('Erro ao armazenar o conteúdo');
        }
        res.send('Conteúdo armazenado com sucesso');
    });
};

module.exports = { armazenarConteudo };