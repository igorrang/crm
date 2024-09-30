connection = require('./connectionDois')

const getTable = async () => {
    try {
        // Codigo sql
        const sql = `SELECT * FROM cliente`
        // Query banco
        const [query] = await connection.execute(sql)
        console.log("Query result no backend:", query)
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

    console.log(dataInicio);
    
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

const putTable = async (newData, tableName, oldName) => {
    const {Data_de_Inicio, nome, Contato,Anuncio, observacoes,valor_fichas,Status} = newData
    try{
        const sql = `UPDATE \`${tableName}\` SET Data_de_Inicio = ?, nome = ?, Contato = ?, Anuncio = ?, observacoes = ?, valor_fichas = ?, Status = ? WHERE nome = ?`;
        const [rows ] = await connection.execute(sql, [Data_de_Inicio, nome, Contato, Anuncio, observacoes, valor_fichas, Status , oldName]);
        return rows;
    }  catch {
        return 'Erro na query com o banco de dados'
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