connection = require('./connectionDois')

const postFiltroVerCliente = async (data) => {
    // Pegar valores que vem do front ja desestrutando eles
    const {nomeOrNickname} = data
    try {
        // Codigo sql
        const sql = `SELECT * FROM cliente WHERE nome LIKE '%${nomeOrNickname}%' OR nickname LIKE '%${nomeOrNickname}%' `
        // Query banco
        const [query] = await connection.execute(sql)
        console.log('Query ver cliente filtrando: ', query );
        
        return query
    } catch (err) {
        console.error("Error:", err);
        return 'Erro na QUERY com o BD. Tipo POST do filtro'
    }
}




module.exports = {
    postFiltroVerCliente,
}