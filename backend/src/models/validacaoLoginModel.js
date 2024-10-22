const connection = require("./connection")

const getAll = async () => {
    const [clientes] = await connection.execute("SELECT * FROM users")
    return clientes
}

const postCliente = async (cliente) => {
    try {
        const {email} = cliente
        const {senha} = cliente

        const [clientes] = await connection.execute(`SELECT * FROM users WHERE email='${email}' AND senha='${senha}'`)
        
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
    getAll,
    postCliente
}