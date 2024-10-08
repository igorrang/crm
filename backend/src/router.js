const express = require("express")
const multer = require("multer")
const router = express.Router()

const clientesControllers = require("./controllers/validacaoLoginControllers")
const tableConstrollers = require('./controllers/tableControllers')
const filtroTableConstrollers = require('./controllers/firstController')
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

//router upload foto
router.post("/filtroTableConstrollers",multer(UploadAvatar.getConfig).single("avatar"),firstController.UploadAvatar)

// Ver cliente
router.post('/filtroVerCliente', filtroVerClienteControllers.postFiltroVerCliente)

// Historico
router.get('/historico', historicoControllers.getHistorico)
router.post('/historico', historicoControllers.postHistorico)

multer(UploadAvatar.getConfig).single("avatar")
// console.log(this.delete)
module.exports = router