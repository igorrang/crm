import { NextResponse } from 'next/server';
import PlanilhaService from '@/service/PlanilhaService';


export async function POST(req: Request) {
  try {
    const { dateFrom, dateTo } = await req.json();
    const planilhas = await PlanilhaService.filtrarPorData(dateFrom, dateTo);
    return NextResponse.json(planilhas);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao filtrar planilhas' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const planilhas = await PlanilhaService.listarPlanilhas();
    return NextResponse.json(planilhas);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao listar planilhas' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await PlanilhaService.deleteLead('all');
    return NextResponse.json({ 
      success: true,
      message: 'Todos os registros foram excluídos'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao excluir registros' },
      { status: 500 }
    );
  }
} 