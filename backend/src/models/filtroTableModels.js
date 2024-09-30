connection = require('./connectionDois')

const { format, parseISO } = require('date-fns');

const postFiltroTable = async (data) => {
    // Pegar valores que vem do front ja desestrutando eles
    const {dateFrom} = data
    const {dateTo} = data
    
    const formattedDateFrom = format( parseISO(dateFrom), 'yyyy-MM-dd');
    const formattedDateTo = format( parseISO(dateTo), 'yyyy-MM-dd');
    
    console.log("date From", formattedDateFrom);
    console.log("date To", formattedDateTo);
    
    try {
        // Codigo sql
        const sql = `SELECT * FROM cliente WHERE dataInicio BETWEEN '${formattedDateFrom}' AND '${formattedDateTo}' `
        // Query banco
        const [query] = await connection.execute(sql)
        return query
    } catch (err) {
        console.error("Error:", err);
        return 'Erro na QUERY com o BD. Tipo POST do filtro'
    }
}




module.exports = {
    postFiltroTable,
}