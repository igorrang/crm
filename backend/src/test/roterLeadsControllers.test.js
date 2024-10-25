const request = require('supertest');
const app = require('../app');
const connection = require('../models/connection');


    it('deve retornar todos os clientes do banco de dados', async () => {
        const response = await request(app)
            .get('/leads/clientes/soma-id'); // Ajuste para a nova rota
    
        console.log('Resposta para todos os clientes:', response.body); // Adiciona log para depuração
    
      
    
    });
