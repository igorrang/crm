import { NextResponse } from 'next/server';
import PlanilhaTabela from '@/models/Planilha';
import { connectMongoDB } from '@/service/lib/mongodb';
import * as XLSX from 'xlsx';

export async function POST(request: Request) {
    try {
        await connectMongoDB();

        const formData = await request.formData();
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

            // Salvar os dados no MongoDB
            const savedRecords = await PlanilhaTabela.insertMany(jsonData);
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
