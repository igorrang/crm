const connection = require('/Users/igorrangelkonvictus/crm/backend/src/models/tableModels.js'); // Caminho para o seu arquivo de conexão

const data = {
  data_inicio: '2022-01-01',
  nome: 'Nome Teste',
  contato: 'Contato Teste',
  anuncio: 'Anúncio Teste',
  observacoes: 'Observações Teste',
  valor_fichas: 100,
  status: 'Ativo',
};

postTable(data);

