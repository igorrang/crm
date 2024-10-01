const connection = require("./connectionDois")

const getAll = async () => {
    const [clientes] = await connection.query("SELECT * FROM users")
    return clientes
}

const postCliente = async (cliente) => {
    try {
        const {email, senha} = cliente

        const clientes = await connection.query('SELECT * FROM users WHERE email = $1 AND senha = $2', [email, senha])
        
        // Se o array retornado for diferente de vázio, ele encontrou um usuário com os dados apresentados
        if (clientes.rows.length !== 0) {
            return clientes.rows
        } else {
            return 'Não foi encontrado nenhum usuário com esses dados'
        }
    } catch (error) {
        console.error(error);
        return 'Erro ao buscar usuário';
    }
}
module.exports = {
    getAll,
    postCliente
}