const express = require("express")

const router = express.Router()

const routerValidacaoLogin = require("./router/validacaoLoginRota.js")
const routerTablesCrud = require('/Users/igorrangelkonvictus/crm/backend/src/Routers/tableControllers.js')

const routerLogin = express.Router(routerValidacaoLogin)
const routerTables = express.Router(routerTablesCrud)

// console.log(this.delete)
module.exports = routerLogin