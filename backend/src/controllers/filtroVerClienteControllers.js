const filtroVerClienteModels = require("../models/filtroVerClienteModels")


const postFiltroVerCliente = async (req, res) => {
    const data = req.body;
    const table = await filtroVerClienteModels.postFiltroVerCliente(data)
    return res.status(200).json(table)
}



module.exports = {
    postFiltroVerCliente,
}

