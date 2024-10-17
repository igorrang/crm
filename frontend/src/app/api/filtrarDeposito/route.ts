import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id_cliente = searchParams.get('id_cliente');

    const res = await axios.get(`http://localhost:5050/filtrarDeposito?id_cliente=${id_cliente}`);
    const dados = res.data;
    
    return NextResponse.json(dados);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await axios.post('http://localhost:5050/filtrarDeposito', body);
    const data = res.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting table data:', error);
    return NextResponse.error();
  }
}

