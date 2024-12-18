import { NextApiRequest, Redirect } from 'next';
import { NextResponse } from 'next/server';
import { NextApiResponse } from 'next';
export async function GET(res: NextApiResponse<Redirect>, req: NextApiRequest) {
  try {
    const { searchParams } = new URL(req.body);
    const id_cliente = searchParams.get('id_cliente');
   


    const res = await (`http://localhost:3000/historico?id_cliente=${id_cliente}`);
    const dados = res
    
    return NextResponse.json(dados);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.error();
  }
}

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      // Perform operations with the data
      res.status(200).json({ message: 'Success', data });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
