const express = require("express")

const router = express.Router()

const clientesControllers = require("./controllers/validacaoLoginControllers")
const tableConstrollers = require('./controllers/tableControllers')
const filtroTableConstrollers = require('./controllers/filtroTableConstrollers')
const filtroVerClienteControllers = require('./controllers/filtroVerClienteControllers')
const historicoControllers = require('./controllers/historicoControllers')

router.get("/validacaoLogin", clientesControllers.getCliente)
router.post("/validacaoLogin", clientesControllers.postCliente)

// // Codigo Igor:
router.get('/tables', tableConstrollers.getTable)
router.post('/tables', tableConstrollers.postTable)
router.put('/tables/', tableConstrollers.putTable)
router.delete('/tables/:tableName/:rowId', tableConstrollers.deleteTable)

router.post('/filtroTable', filtroTableConstrollers.postFiltroTable)

// Ver cliente
router.post('/filtroVerCliente', filtroVerClienteControllers.postFiltroVerCliente)

// Historico
router.get('/historico', historicoControllers.getHistorico)
router.post('/historico', historicoControllers.postHistorico)


// console.log(this.delete)
module.exports = router