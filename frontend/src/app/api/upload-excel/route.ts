import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import PlanilhaService from '@/service/PlanilhaService';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // Adicionar logs para debug
    console.log('Arquivo recebido:', file.name);
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Lê o arquivo Excel
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    
    // Log para verificar as worksheets
    console.log('Worksheets:', workbook.SheetNames);
    
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Processa cada linha da planilha
    for (const row of jsonData) {
      const planilhaData = {
        nome: row['Nome'],
        origem: row['Origem'],
        status: row['Status'] || 'Pendente',
        datainicio: new Date(row['Data de Início'] || new Date()),
        nickname: row['Nickname'],
        valordasfichas: row['Valor das Fichas']?.toString() || '0',
        ultimatualizacao: new Date().toISOString(),
        observacoes: row['Observações'] || ''
      };

      await PlanilhaService.createLeed({
        nome: planilhaData.nome,
        origem: planilhaData.origem,
        status: planilhaData.status,
        datainicio: planilhaData.datainicio,
        nickname: planilhaData.nickname,
        valorFicha: planilhaData.valordasfichas,
        observacoes: planilhaData.observacoes
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `${jsonData.length} registros importados com sucesso` 
    });

  } catch (error) {
    console.error('Erro no processamento:', error);
    return NextResponse.json(
      { error: 'Erro ao processar arquivo' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 