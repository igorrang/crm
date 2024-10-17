const express = require("express")

const routerValidacaoLogin = express.Router()
const clientesControllers = require("/Users/igorrangelkonvictus/crm/backend/src/controllers/validacaoLoginControllers.js")

routerValidacaoLogin.get("/validacaoLogin", clientesControllers.getCliente)
routerValidacaoLogin.post("/validacaoLogin", clientesControllers.postCliente)



module.exports = routerValidacaoLogin