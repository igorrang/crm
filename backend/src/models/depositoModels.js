const connection = require("./connection")

const getDeposito = async (data) => {
    // Pegar valores que vem do front ja desestrutando eles
    const {id_deposito} = data

    try {
        // Codigo sql
        const sql = `SELECT * FROM deposito WHERE id_deposito='${id_deposito}' `
        // Query banco
        const [query] = await connection.execute(sql)
        console.log('Query mostrando dados do deposito: ', query );
        
        return query
    } catch (err) {
        console.error("Error:", err);
        return 'Erro na QUERY com o BD. Tipo POST do filtro'
    }
}

const postDeposito = async (deposito) => {
    try {
        const {identificadorCliente} = deposito
        const {data} = deposito
        const {hora} = deposito
        const {valorReais} = deposito
        const {valorFicha} = deposito
        const {anexo} = deposito

        const [clientes] = await connection.execute(`INSERT INTO deposito VALUES (null, '${data}', '${hora}', '${valorReais}', '${valorFicha}', ${identificadorCliente})`)
        
        // Se o array retornado for diferente de vázio, ele encontrou um usuário com os dados apresentados
        if (clientes.length !== 0) {
            return clientes
        } else {
            return 'Não foi encontrado nenhum usuário com esses dados'
        }
        
        return clientes
    } catch (error) {
        'Erro na Requisição com o Banco de Dados'
    }
}

module.exports = {
    getDeposito,
    postDeposito,
}