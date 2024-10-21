const express = require("express")

const session = require("express-session");


const router = require("./router")

const app = express()

app.use(express.json())

app.use(
    session({
      secret: "meu-segredo", // Use uma string segura em produção
      resave: false, // Não salva a sessão se nada mudou
      saveUninitialized: false, // Não cria sessão até que algo seja armazenado
      cookie: { maxAge: 60000 }, // Sessão expira em 1 minuto (60000ms)
    })
  );

app.use(router)

module.exports = app