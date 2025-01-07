const express = require("express")

const router = express.Router()

const clientesControllers = require("./controllers/validacaoLoginControllers")
const tableConstrollers = require('./controllers/tableControllers')

router.get("/validacaoLogin", clientesControllers.getCliente)
router.post("/validacaoLogin", clientesControllers.postCliente)

// Codigo Igor:
router.get('/tables', tableConstrollers.getTable)
router.post('/tables', tableConstrollers.postTable)
router.put('/tables/:tableName/:rowId', tableConstrollers.putTable)
router.delete('/tables/:tableName/:rowId', tableConstrollers.deleteTable)


//router.post('/filtroTable', filtroTableConstrollers.postFiltroTable)

// Ver cliente
//router.post('/filtroVerCliente', filtroVerClienteControllers.postFiltroVerCliente)

//router.post('/uploadFile', filtroConstrollers.uploadAvatar)
// Historico
//router.get('/historico', historicoControllers.getHistorico)
//router.post('/historico', historicoControllers.postHistorico)



module.exports = router