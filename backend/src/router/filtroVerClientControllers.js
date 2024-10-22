const express = require("express")
// Ver cliente

const routerVerClienteControllers = express.Router()
const filtroVerClienteControllers = require('../controllers/filtroVerClienteControllers.js')
routerVerClienteControllers.post('/filtroVerCliente', filtroVerClienteControllers.postFiltroVerCliente)

module.exports = routerVerClienteControllers