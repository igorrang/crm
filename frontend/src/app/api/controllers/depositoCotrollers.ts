import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from '@/service/lib/mongodb';
import PlanilhaTabela from '@/models/Planilha';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await postDeposito();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ 
      error: "Erro ao buscar dados do depósito",
      details: error instanceof Error ? error.message : "Erro desconhecido"
    });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    const result = await postDeposito(data);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao criar depósito", 
      details: error instanceof Error ? error.message : "Erro desconhecido"
    });
  }
}

export async function deletePlanilha(id: string) {
  try {
    await connectMongoDB();
    const result = await PlanilhaTabela.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Planilha não encontrada');
    }
    return { success: true };
  } catch (error) {
    console.error('Erro ao excluir planilha:', error);
    throw new Error('Falha ao excluir planilha');
  }
}

// Handler principal que roteia para os métodos específicos
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return GET(req, res);
    case 'POST':
      return POST(req, res);
    default:
      return res.status(405).json({ error: 'Método não permitido' });
  }
}

console.log('Tentando conectar ao MongoDB:', process.env.MONGODB_URI);
