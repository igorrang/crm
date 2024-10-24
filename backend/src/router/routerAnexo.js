const express = require('express');
const { armazenarConteudo } = require('../controllers/envioAnexoControllers.js');

const anexo = express.Router();
anexo.use(express.json());
anexo.post('/armazenar', armazenarConteudo);

module.exports = anexo;