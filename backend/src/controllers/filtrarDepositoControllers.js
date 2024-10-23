const filtrarDepositoModels = require('../models/filtrarDepositoModels')

const getDeposito = async (req, res) => {
    const  data  = req.query
    const table = await filtrarDepositoModels.getDeposito(data)
    return res.status(200).json(table)
}

const postDeposito = async (req, res) => {
    const data = req.body;
    const table = await filtrarDepositoModels.postDeposito(data)
    return res.status(200).json(table)
}

module.exports = {
    getDeposito,
    postDeposito,
}

