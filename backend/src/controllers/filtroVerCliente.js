const filtroVerCliente = require("../models/filtroVerCliente")


const postFiltroVerCliente = async (req, res) => {
    const data = req.body;
    const table = await filtroVerCliente.postFiltroVerCliente(data)
    return res.status(200).json(table)
}



module.exports = {
    postFiltroVerCliente,
}

