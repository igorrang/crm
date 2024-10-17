const express = require("express")

const tableConstrollers = require('/Users/igorrangelkonvictus/crm/backend/src/models/tableModels.js')
const routerTablesCrud = express.Router()

routerTablesCrud.get('/tables', tableConstrollers.getTable)
routerTablesCrud.post('/tables', tableConstrollers.postTable)
routerTablesCrud.put('/tables/:tableName/:rowId', tableConstrollers.putTable)
routerTablesCrud.delete('/tables/:tableName/:rowId', tableConstrollers.deleteTable)

module.exports = routerTablesCrud