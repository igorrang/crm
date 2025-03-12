import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
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

export const config = {
  api: {
    bodyParser: false, // Necessário para processar uploads de arquivos
  },
};

// Função auxiliar para ler e processar o arquivo Excel
const processExcelFile = (filePath: string) => {
  // Lê o arquivo Excel
  const workbook = XLSX.readFile(filePath);
  // Seleciona a primeira planilha
  const sheetName = workbook.SheetNames[0];
  
  const worksheet = workbook.Sheets[sheetName];
  // Converte a planilha em JSON
  const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet, { raw: false });
  return jsonData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Configurar o processamento do upload do arquivo
    const form = formidable({
      uploadDir: '/tmp', // Pasta temporária para armazenar o arquivo
      keepExtensions: true,
    });

    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao processar upload' });
      }

      // Verificar se um arquivo foi enviado
      const file = files.file;
      if (!file || Array.isArray(file)) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      const filePath = file;
      const excelData = processExcelFile(filePath);

      if (!Array.isArray(excelData) || excelData.length === 0) {
        return res.status(400).json({ error: 'Nenhum dado válido encontrado no arquivo' });
      }

      // Processar cada linha do Excel e inserir no banco de dados
      const savedRecords = [];
      const errors = [];

      for (const row of excelData) {
        
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

      // Remover o arquivo temporário após o processamento
      fs.unlinkSync(filePath);

      return res.status(200).json({
        success: true,
        message: `${savedRecords.length} registros importados com sucesso`,
        savedRecords,
        errors: errors.length > 0 ? errors : undefined,
      });
    });
  } catch (error) {
    console.error('Erro no processamento:', error);
    return res.status(500).json({ error: 'Erro ao processar arquivo' });
  }
}