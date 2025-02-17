import { NextResponse } from 'next/server';
import PlanilhaService from '@/service/PlanilhaService';

export async function POST(req: Request) {
    try {

        let dadosPlanilha = await req.json()
        let planilha = await PlanilhaService.criarPlanilha(dadosPlanilha)

    } catch {

    }
}