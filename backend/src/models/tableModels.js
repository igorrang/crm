const connection = require('./connection/connectionDois');

const getTable = async () => {
    const res = await connection.query('SELECT * FROM agosto');
    return res.rows;
}

const postTable = async (data) => {
    const res = await connection.query(
        'INSERT INTO agotso (data_de_inicio, nome, contato, anuncio, observacoes, valor_fichas, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [data.data_de_inicio, data.nome, data.contato, data.anuncio, data.observacoes, data.valor_fichas, data.status]
    );
    return res.rows[0];
};

const putTable = async (id, data) => {
    const res = await pool.query('UPDATE agosto SET column1 = $1, column2 = $2 WHERE id = $3 RETURNING *', [data.column1, data.column2, id]);
    return res.rows[0];
}

const deleteTable = async (id) => {
    const res = await connection.query('DELETE FROM your_table WHERE id = $1', [id]);
    return res.rows[0];
}

module.exports = {
    getTable,
    postTable,
    putTable,
    deleteTable
}