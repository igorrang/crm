export interface Payment {
  _id: string;
  dataInicio: string;
  nome: string;
  origem: string;
  nickname: string;
  observacao: string;
  valorFicha: string;
  status: "Pendente" | "Processando" | "Sucesso" | "Fracassado";
  ultimaAtualizacao: string;
} 