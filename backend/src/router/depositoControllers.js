const express = require("express")
const routerDepositoControllers = express.Router()
const depositoControllers = require('../controllers/depositoControllers')


const logMiddleware = (req,res,next) =>{
    console.log(`${req.getDeposito} ${req.routerDepositoControllers} - ${new Date().toISOString()}`)
    next()
}

routerDepositoControllers.use(logMiddleware)

routerDepositoControllers.get('/deposito', depositoControllers.getDeposito)


module.exports = routerDepositoControllers