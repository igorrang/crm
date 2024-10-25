const express = require("express");

const {
    routerLogin,
    routerTables,
    historico,
    filtrarDepositoControllers,
    depositoControllers,
    filtroVerClientControllers,
    anexoRouter,
    leads
} = require("./router");

const app = express();

app.use(express.json());

app.use('/login', routerLogin);
app.use('/tables', routerTables);
app.use('/historico', historico);
app.use('/filtrar-deposito', filtrarDepositoControllers);
app.use('/deposito', depositoControllers);
app.use('/ver-cliente', filtroVerClientControllers);
app.use('/anexo', anexoRouter);
app.use('/leads', leads);

module.exports = app;