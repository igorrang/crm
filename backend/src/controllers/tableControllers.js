const tableModels = require("../models/tableModels")

const getTable = async (req, res) => {    
    const table = await tableModels.getTable()
    return res.status(200).json(table)
}

const postTable = async (req, res) => {
    const data = req.body;
    
    const table = await tableModels.postTable(data)
    return res.status(200).json(table)
}

const putTable = async (req,res) => {
    const newData = req.body

    const table = await tableModels.putTable(newData)
    return res.status(200).json(table)
}

const deleteTable = async (res,req) =>{
    const tableName = req.params.tableName;

    const drop = await tableModels.deleteTable(tableName)
    return res.status(200).json(drop)
}

module.exports = {
    postTable,
    putTable,
    deleteTable,
    getTable
}

