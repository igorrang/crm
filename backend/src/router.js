const express = require("express")
const router = express.Router()

const routerValidacaoLogin = require("./router/validacaoLoginRota.js")
const routerTablesCrud = require('./router/tableControllers.js')
const routerHistorico = require('./router/historico.js')
const routerFiltrarDepositoControllers = require('./router/filtrarDepositoControllers.js') 
const routerDepositoControllers = require('./router/depositoControllers.js')
const routerVerClienteControllers = require('./router/filtroVerClientControllers.js')
const anexo = require("./router/routerAnexo.js")

const anexoRouter= express.Router(anexo)
const filtroVerClientControllers = express.Router(routerVerClienteControllers)
const depositoControllers = express.Router(routerDepositoControllers)
const filtrarDepositoControllers = express.Router(routerFiltrarDepositoControllers)
const historico = express.Router(routerHistorico)
const routerLogin = express.Router(routerValidacaoLogin)
const routerTables = express.Router(routerTablesCrud)


module.exports = routerLogin , routerTables , historico , filtrarDepositoControllers , depositoControllers , filtroVerClientControllers , router , anexoRouter;