import { Box } from '@/components/Box';
import { NextResponse} from 'next/server';
import * as XLSX from 'xlsx';
import PlanilhaService from '@/service/PlanilhaService';

interface ExcelRow {
  'Nome': string;
  'Origem': string;
  'Status': string;
  'Data de Inicio': string;
  'Apelido': string;
  'Valor Fichas': string | number;
  'Observações': string;
  'Bônus':string;
  'Anuncio':string;
  '@instagra':string;
  'contato':string ;

}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // Debug: Log do nome do arquivo
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
    
    // Debug: Log das worksheets e suas colunas
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
    console.log('Colunas encontradas:', headers);
    
    const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { raw: false });
    
    // Debug: Log da primeira linha de dados
    console.log('Primeira linha de dados:', jsonData[0]);

    const savedRecords = [];
    const errors = [];

    // Processa cada linha da planilha
    for (const row of jsonData) {
      try {
        const planilhaData = {
          nome: row['Nome'] ?? '',
          origem: row['Origem'] ?? '',
          status: row['Status'] ?? 'Pendente',
          datainicio: new Date(row['Data de Inicio'] ?? new Date()),
          apelido: row['Apelido'] ?? '',
          valordasfichas: String(row['Valor Fichas'] ?? '0'),
          ultimatualizacao: new Date().toISOString(),
          observacoes: row['Observações'] ?? '',
          bonus: row['Bônus'] ?? '',
          anuncio: row['Anuncio'] ?? '',
          instagram: row['@instagra'] ?? '',
          contato: row['contato'] ?? '',
        };

        console.log('Tentando salvar linha:', planilhaData);
        
        const result = await PlanilhaService.createLeed({
          nome: planilhaData.nome,
          origem: planilhaData.origem,
          status: planilhaData.status,
          datainicio: planilhaData.datainicio,
          nickname: planilhaData.apelido,
          valorFicha: planilhaData.valordasfichas,
          observacoes: planilhaData.observacoes,
          bonus: planilhaData.bonus,
          anuncio: planilhaData.anuncio,
          instagram: planilhaData.instagram,
          contato: planilhaData.contato,
        });

        savedRecords.push(result.data);
      } catch (error: any) {
        console.error('Erro ao processar linha:', error);
        errors.push({ row, error: error.message });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `${savedRecords.length} registros importados com sucesso`,
      savedRecords,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error: any) {
    console.error('Erro no processamento:', error);
    return NextResponse.json(
      { error: 'Erro ao processar arquivo', details: error.message },
      { status: 500 }
    );
  }
}



