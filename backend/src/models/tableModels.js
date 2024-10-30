const connection = require('./connection')

const getTable = async () => {
    try {
        // Codigo sql
        const sql = `SELECT * FROM cliente`
        // Query banco
        const [query] = await connection.execute(sql)
        // console.log("Query result no backend:", query)
        return query
    } catch (err) {
        console.error("Error:", err);
        return 'Erro na QUERY com o BD. Tipo GET', err
    }
}
const postTable = async (data) => {
    // Pegar valores que vem do front ja desestrutando eles
    const {dataInicio} = data
    const {nome} = data
    const {origem} = data
    const {nickName} = data
    const {observacao} = data
    const {valorFicha} = data
    const {status} = data
    const {ultimaAtualizacao} = data
    const {telefone} = newData
    
    try {
        // Codigo sql
        const sql = `INSERT INTO cliente VALUES (null, '${dataInicio}', '${nome}', '${origem}','${nickName}', '${observacao}', ${valorFicha}, '${status}', '${ultimaAtualizacao}', '${telefone}')`
        // Query banco
        const [query] = await connection.execute(sql)
        return query
    } catch (err) {
        console.error("Error:", err);
        return 'Erro na QUERY com o BD. Tipo POST'
    }
}

const putTable = async (newData) => {
    const {identificador} = newData
    const {dataInicio} = newData
    const {nome} = newData
    const {origem} = newData
    const {nickname} = newData
    const {observacao} = newData
    const {valorFicha} = newData
    const {status} = newData
    const {ultimaAtualizacao} = newData
    const {telefone} = newData
    
    try{
        const sql = `UPDATE cliente SET dataInicio = '${dataInicio}', nome = '${nome}', origem = '${origem}', nickname='${nickname}', observacao = '${observacao}', valorFicha = '${valorFicha}', status = '${status}', ultimaAtualizacao = '${ultimaAtualizacao}' WHERE id_cliente = '${identificador}', '${telefone}'`;
        const [query ] = await connection.execute(sql);
        return query;
    }  catch (err){
        console.error("Error:", err);
        return 'Erro na query com o banco de dados. tipo putTable'
    }  
}
module.exports = {
    getTable,
    postTable,
    putTable,

}