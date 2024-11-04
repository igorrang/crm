const connection = require('./connection');

const getTable = async () => {
    try {
        const sql = `SELECT * FROM cliente`;
        const [query] = await connection.execute(sql);
        return query;
    } catch (err) {
        console.error("Erro na consulta GET:", err);
        return 'Erro na consulta com o banco de dados';
    }
}

const postTable = async (data) => {
    const { dataInicio, nome, origem, nickName, observacao, valorFicha, status, ultimaAtualizacao } = data;
    
    try {
        const sql = `
            INSERT INTO cliente (dataInicio, nome, origem, nickName, observacao, valorFicha, status, ultimaAtualizacao)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [query] = await connection.execute(sql, [dataInicio, nome, origem, nickName, observacao, valorFicha, status, ultimaAtualizacao]);
        return query;
    } catch (err) {
        console.error("Erro na consulta POST:", err);
        return 'Erro na consulta com o banco de dados';
    }
}

const putTable = async (newData) => {
    const { identificador, dataInicio, nome, origem, nickname, observacao, valorFicha, status, ultimaAtualizacao } = newData;
   
    try {
        const sql = `
            UPDATE cliente 
            SET dataInicio = ?, nome = ?, origem = ?, nickname = ?, observacao = ?, valorFicha = ?, status = ?, ultimaAtualizacao = ? 
            WHERE id_cliente = ?
        `;
        const [query] = await connection.execute(sql, [dataInicio, nome, origem, nickname, observacao, valorFicha, status, ultimaAtualizacao, identificador]);
        return query;
    } catch (err) {
        console.error("Erro na consulta PUT:", err);
        return 'Erro na consulta com o banco de dados';
    }
}

const deleteTable = async (tableName, conditions) => {
    const { data_inicio, nome, contato, anuncio, observacoes, valor_fichas, status } = conditions;

    try {
        const sql = `DELETE FROM ${tableName} WHERE data_inicio = ? AND nome = ? AND contato = ? AND anuncio = ? AND observacoes = ? AND valor_fichas = ? AND status = ?`;
        const [query] = await connection.execute(sql, [data_inicio, nome, contato, anuncio, observacoes, valor_fichas, status]);
        return query;
    } catch (err) {
        console.error("Erro na consulta DELETE:", err);
        return 'Erro na consulta com o banco de dados';
    }
}

module.exports = {
    getTable,
    postTable,
    putTable,
    deleteTable
}