connection = require('./connectionDois')

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
    const {observacao} = data
    const {valorFicha} = data
    const {status} = data
    const {ultimaAtualizacao} = data
    
    try {
        // Codigo sql
        const sql = `INSERT INTO cliente VALUES (null, '${dataInicio}', '${nome}', '${origem}', '${observacao}', '${valorFicha}', '${status}', '${ultimaAtualizacao}')`
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
    const {observacao} = newData
    const {valorFicha} = newData
    const {status} = newData
    const {ultimaAtualizacao} = newData
   
    
    try{
        const sql = `UPDATE cliente SET dataInicio = '${dataInicio}', nome = '${nome}', origem = '${origem}', observacao = '${observacao}', valorFicha = '${valorFicha}', status = '${status}', ultimaAtualizacao = '${ultimaAtualizacao}' WHERE id = '${identificador}'`;
        const [query ] = await connection.execute(sql);
        return query;
    }  catch (err){
        console.error("Error:", err);
        return 'Erro na query com o banco de dados. tipo putTable'
    }  

}

const deleteTable = async (dropData, tableName) => {
    const {data_inicio, nome, contato,anuncio, observacoes,valor_fichas,status} = newData
    try{
        const query = `DELETE FROM '${tableName}' WHERE None = ?`
        const [sql] = await connection.execute(query,[data_inicio,nome,contato,anuncio,observacoes,valor_fichas,status])
        return sql

    }catch{
        return 'erro na query com o banco de dados '
    }
}


module.exports = {
    getTable,
    postTable,
    putTable,
    deleteTable
}