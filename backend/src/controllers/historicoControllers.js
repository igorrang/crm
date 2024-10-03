const historicoModels = require("../models/historicoModels")


const getHistorico = async (req, res) => {
    const  data  = req.query
    const table = await historicoModels.getHistorico(data)
    return res.status(200).json(table)
}



module.exports = {
    getHistorico,
}
