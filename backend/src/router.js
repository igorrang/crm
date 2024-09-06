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

console.log(this.delete)
module.exports = router