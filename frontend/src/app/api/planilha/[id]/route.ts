import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/service/lib/mongodb';
import PlanilhaTabela from '@/models/Planilha';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectMongoDB();
        const result = await PlanilhaTabela.findByIdAndDelete(params.id);
        
        if (!result) {
            return NextResponse.json(
                { error: 'Planilha não encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erro ao excluir:', error);
        return NextResponse.json(
            { error: 'Erro ao excluir planilha' },
            { status: 500 }
        );
    }
} 