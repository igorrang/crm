import { NextResponse } from 'next/server';
import PlanilhaService from '@/service/PlanilhaService';
import * as XLSX from 'xlsx'; // Importando a biblioteca xlsx

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

// Novo endpoint para importar planilha Excel
export async function importPlanilha(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !file.name.endsWith('.xlsx')) {
      return NextResponse.json(
        { error: 'Por favor, envie um arquivo Excel válido.' },
        { status: 400 }
      );
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Salvar os dados no MongoDB usando o PlanilhaService
      const savedRecords = await PlanilhaService.salvarPlanilhas(jsonData);
      return NextResponse.json(
        { message: 'Dados importados com sucesso!', records: savedRecords },
        { status: 200 }
      );
    };

    reader.readAsBinaryString(file);

    // Retornar uma resposta padrão enquanto o FileReader processa o arquivo
    return NextResponse.json(
      { message: 'Processando arquivo...' },
      { status: 202 }
    );

  } catch (error) {
    console.error('Erro ao importar planilha:', error);
    return NextResponse.json(
      { error: 'Erro ao importar planilha' },
      { status: 500 }
    );
  }
}
