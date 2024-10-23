const express = require("express")
const routerTableControllers = express.Router()
const tableControllers = require('../controllers/tableControllers.js')


routerTableControllers.get('/tables', tableControllers.getTable)
routerTableControllers.post('/tables', tableControllers.postTable)
routerTableControllers.put('/tables/', tableControllers.putTable)
routerTableControllers.delete('/tables/:tableName/:rowId', tableControllers.deleteTable)
routerTableControllers.post('/filtroTable', tableControllers.postFiltroTable)

module.exports = routerTableControllers