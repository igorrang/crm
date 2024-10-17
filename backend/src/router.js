const express = require("express")
const routerValidacaoLogin = require("/Users/igorrangelkonvictus/crm/backend/src/Routers/routerValidacaoLogin.js")
const routerTablesCrud = require('/Users/igorrangelkonvictus/crm/backend/src/Routers/tableControllers.js')

const routerLogin = express.Router(routerValidacaoLogin)
const routerTables = express.Router(routerTablesCrud)

module.exports = routerLogin , routerTables