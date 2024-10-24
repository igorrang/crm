const fs = require('fs');
const request = require('supertest');
const express = require('express');
const { armazenarConteudo } = require('../controllers/envioAnexoControllers.js');
const connection = require('../models/connection');

jest.mock('../models/connection');

const app = express();
app.use(express.json());
app.post('/armazenar', armazenarConteudo);

describe('POST /armazenar', () => {
    it('deve armazenar o conteúdo com sucesso', async () => {
        // Mock da consulta ao banco de dados
        connection.execute.mockResolvedValue([[{ id_cliente: 1 }]]);

        const response = await request(app)
            .post('/armazenar')
            .send({ id_cliente: 1, conteudo: 'Conteúdo de teste' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Conteúdo armazenado com sucesso');
    });

    it('deve retornar 404 se o cliente não for encontrado', async () => {
        // Mock da consulta ao banco de dados
        connection.execute.mockResolvedValue([[]]);

        const response = await request(app)
            .post('/armazenar')
            .send({ id_cliente: 999, conteudo: 'Conteúdo de teste' });

        expect(response.status).toBe(404);
        expect(response.text).toBe('Cliente não encontrado');
    });

    it('deve retornar 500 se ocorrer um erro ao armazenar o conteúdo', async () => {
        // Mock da consulta ao banco de dados
        connection.execute.mockResolvedValue([[{ id_cliente: 1 }]]);

        // Mock do fs.writeFile para simular um erro
        jest.spyOn(fs, 'writeFile').mockImplementation((path, data, callback) => {
            callback(new Error('Erro ao armazenar o conteúdo'));
        });

        const response = await request(app)
            .post('/armazenar')
            .send({ id_cliente: 1, conteudo: 'Conteúdo de teste' });

        expect(response.status).toBe(500);
        expect(response.text).toBe('Erro ao armazenar o conteúdo');
    });
});