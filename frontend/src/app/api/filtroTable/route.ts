import { NextResponse } from 'next/server';
import PlanilhaService from '@/service/PlanilhaService';

export async function POST(request: Request) {
  try {
    const { dateFrom, dateTo } = await request.json();
    
    const planilhas = await PlanilhaService.filtrarPorData(dateFrom, dateTo);
    
    const formattedData = planilhas.map(planilha => ({
      _id: planilha._id.toString(),
      dataInicio: new Date(planilha.datainicio).toLocaleDateString('pt-BR'),
      nome: planilha.nome,
      origem: planilha.origem,
      nickname: planilha.nickname,
      observacao: planilha.observacoes || '',
      valorFicha: planilha.valordasfichas,
      status: planilha.status,
      ultimaAtualizacao: planilha.ultimatualizacao
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Erro ao filtrar dados:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 