import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const res = await axios.get('http://frontend-backend-ff5606:5050/validacaoLogin', body);
    const dados = res.data;
    console.log(NextResponse.json(dados));
    
    return NextResponse.json(dados);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await axios.post('http://frontend-backend-ff5606:5050/validacaoLogin', body);
    const data = res.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting book:', error);
    return NextResponse.error();
  }
}