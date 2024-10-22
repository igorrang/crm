const request = require('supertest');
const express = require('express');
const routerDepositoControllers = require('../router/depositoControllers');

const app = express();
app.use(express.json());
app.use('/api', routerDepositoControllers);

describe('Testando depositoControllers', () => {
  it('Deve registrar um log e retornar 200 na rota GET /api/deposito', async () => {
    const response = await request(app).get('/api/deposito');
    expect(response.status).toBe(200);
  });
});