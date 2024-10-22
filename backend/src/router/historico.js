// Historico
const express = require('express')
const routerHistorico = express.Router()
const historicoControllers = require('../controllers/historicoControllers')
routerHistorico.get('/historico', historicoControllers.getHistorico)
routerHistorico.post('/historico', historicoControllers.postHistorico)

module.exports = routerHistorico