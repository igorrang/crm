const express = require("express")
const routerDepositoControllers = express.Router()
const depositoControllers = require('../controllers/depositoControllers')



routerDepositoControllers.get('/deposito', depositoControllers.getDeposito)


module.exports = routerDepositoControllers