const request = require('supertest');
const app = require('../app');
const connection = require('../models/connection');

describe('Testes de Integração de Rota de Leads', () => {
    beforeAll(async () => {
        // Configurar o banco de dados de teste e inserir dados de teste
        await connection.execute('CREATE TABLE IF NOT EXISTS botecobrasil.clientes (id_cliente INT PRIMARY KEY, nome VARCHAR(255))');
        await connection.execute('INSERT INTO botecobrasil.clientes (id_cliente, nome) VALUES (1, "Cliente Teste 1"), (2, "Cliente Teste 2")');
    });

    it('deve retornar todos os clientes do banco de dados', async () => {
        const response = await request(app)
            .get('/leads/clientes'); // Ajuste para a nova rota
    
        console.log('Resposta para todos os clientes:', response.body); // Adiciona log para depuração
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id_cliente: 1, nome: 'Cliente Teste 1' },
            { id_cliente: 2, nome: 'Cliente Teste 2' }
        ]);
    });
});