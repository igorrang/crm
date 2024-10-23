const historicoModels = require("../models/historicoModels")


const getHistorico = async (req, res) => {
    const  data  = req.query
    const table = await historicoModels.getHistorico(data)
    return res.status(200).json(table)
}
const postHistorico = async (req, res) => {
    const  body = req.body
    const data = await historicoModels.postHistorico(body)
    return res.status(200).json(data)
}



module.exports = {
    getHistorico,
    postHistorico
}
