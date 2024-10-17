const depositoModels = require('../models/depositoModels')

const getDeposito = async (req, res) => {
    const  data  = req.query
    const table = await depositoModels.getDeposito(data)
    return res.status(200).json(table)
}


module.exports = {
    getDeposito,
}

