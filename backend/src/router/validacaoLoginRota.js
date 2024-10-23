const express = require("express")

const loginRouter = express.Router()
const clientesControllers = require("../controllers/validacaoLoginControllers.js")

loginRouter.get("/validacaoLogin", clientesControllers.getCliente)
loginRouter.post("/validacaoLogin", clientesControllers.postCliente)

module.exports = loginRouter