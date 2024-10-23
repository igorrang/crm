// Importe a função postTable
const { putTable } = require('/Users/igorrangelkonvictus/Documents/GitHub/thenextdev-landingpage/Sem Título/src/AdmistradorExcelKonvictus/Sem Título/backend/src/models/tableModels.js');


// Crie alguns dados de exemplo

const alterData = {
  Data_de_Inicio: '2022-01-01',
  nome: 'igor',
  Contato: 12345,
  Anuncio: 'Novo Anuncio',
  observacoes: 'Novas observacoes',
  valor_fichas: 100,
  Status: 'Novo Status'
};

// Nome da tabela
const tableName = 'agosto';

const oldName = 'mike';
// Chame a função postTable com os dados de exemplo
putTable(alterData, tableName, oldName)
  .then(query => {
    console.log('Query result:', query);
  })
  .catch(err => {
    console.error('Error:', err);
  });