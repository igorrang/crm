const express = require("express")
const routerFiltrarDepositoControllers = express.Router()
const filtrarDepositoControllers = require('../controllers/filtrarDepositoControllers.js')


// Filtrar Deposito
routerFiltrarDepositoControllers.get('/filtrarDeposito', filtrarDepositoControllers.getDeposito)
routerFiltrarDepositoControllers.post('/filtrarDeposito', filtrarDepositoControllers.postDeposito)


module.exports = routerFiltrarDepositoControllers