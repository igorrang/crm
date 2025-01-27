import { NextResponse } from 'next/server';
import PlanilhaTabela from '@/models/Planilha';
import { connectDB } from '@/service/db';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const id = params.id;

        const deletedPlanilha = await PlanilhaTabela.findByIdAndDelete(id);

        if (!deletedPlanilha) {
            return NextResponse.json(
                { error: 'Registro não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Registro excluído com sucesso' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao excluir:', error);
        return NextResponse.json(
            { error: 'Erro ao excluir registro' },
            { status: 500 }
        );
    }
} 