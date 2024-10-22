import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id_deposito = searchParams.get('id_deposito');
    
    const res = await axios.get(`http://localhost:5050/deposito?id_deposito=${id_deposito}`);
    const dados = res.data;
    
    return NextResponse.json(dados);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.error();
  }
}



