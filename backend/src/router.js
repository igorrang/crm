const express = require("express");
const router = express.Router();

const routerLeads = require('./router/routerLeadsRotina.js');
const routerValidacaoLogin = require("./router/validacaoLoginRota.js");
const routerTablesCrud = require('./router/tableControllers.js');
const routerHistorico = require('./router/historico.js');
const routerFiltrarDepositoControllers = require('./router/filtrarDepositoControllers.js');
const routerDepositoControllers = require('./router/depositoControllers.js');
const routerVerClienteControllers = require('./router/filtroVerClientControllers.js');
const anexo = require("./router/routerAnexo.js");

const leads = express.Router();
leads.use(routerLeads);

const anexoRouter = express.Router();
anexoRouter.use(anexo);

const filtroVerClientControllers = express.Router();
filtroVerClientControllers.use(routerVerClienteControllers);

const depositoControllers = express.Router();
depositoControllers.use(routerDepositoControllers);

const filtrarDepositoControllers = express.Router();
filtrarDepositoControllers.use(routerFiltrarDepositoControllers);

const historico = express.Router();
historico.use(routerHistorico);

const routerLogin = express.Router();
routerLogin.use(routerValidacaoLogin);

const routerTables = express.Router();
routerTables.use(routerTablesCrud);

module.exports = {
    routerLogin,
    routerTables,
    historico,
    filtrarDepositoControllers,
    depositoControllers,
    filtroVerClientControllers,
    router,
    anexoRouter,
    leads
};