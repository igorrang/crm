    `import express from 'express';
import sequelize
const table = require('/Users/igorrangelkonvictus/crm/backend/src/controllers/tableControllers.js');

const macroLeads = {
    getLeads: table.getTable,
    postLeads: table.postTable,
    putLeads: table.putTable,
    deleteLeads: table.deleteTable
};

