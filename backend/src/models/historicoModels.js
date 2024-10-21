connection = require('./connection/connection')

const getHistorico = async (data) => {
    // Pegar valores que vem do front ja desestrutando eles
    const {id_cliente} = data

    try {
        // Codigo sql
        const sql = `SELECT * FROM historico WHERE id_cliente='${id_cliente}' `
        // Query banco
        const [query] = await connection.execute(sql)
        // console.log('Query historico: ', query );
        
        return query
    } catch (err) {
        console.error("Error:", err);
        return 'Erro na QUERY com o BD. Tipo POST do filtro'
    }
}

const postHistorico = async (data) => {
    const {mensagemHistorico} = data
    const {mensagemIdCliente} = data

    try {
        // Codigo sql
        const sql = `INSERT INTO historico values (null, '${mensagemHistorico}', '2024-30-05', '15:21', '${mensagemIdCliente}') `
        // Query banco
        const [query] = await connection.execute(sql)
        console.log('Query historico: ', query );
        
        return query
    } catch (err) {
        console.error("Error:", err);
        return 'Erro na QUERY com o BD. Tipo POST do filtro'
    }
}




module.exports = {
    getHistorico,
    postHistorico
}