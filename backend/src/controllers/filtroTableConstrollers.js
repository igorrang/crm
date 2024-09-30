const filtroTableModels = require("../models/filtroTableModels")


const postFiltroTable = async (req, res) => {
    const data = req.body;
    const table = await filtroTableModels.postFiltroTable(data)
    return res.status(200).json(table)
}



module.exports = {
    postFiltroTable,
}

