const validacaoLoginModel = require("../models/validacaoLoginModel")

const getCliente = async (req, res) => {
    const cliente = await validacaoLoginModel.getAll()
    return res.status(200).json(cliente)
}

const postCliente = async (req, res) => {
    const postCliente = await validacaoLoginModel.postCliente(req.body)
    return res.status(200).json(postCliente)
}


module.exports = {
    getCliente,
    postCliente
}