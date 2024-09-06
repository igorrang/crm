import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const res = await axios.get('http://localhost:5050/tables');
    const dados = res.data;
    
    return NextResponse.json(dados);
  } catch (error) {
    console.error('Error fetching tables:', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await axios.post('http://localhost:8000/tables', body);
    const data = res.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting table data:', error);
    return NextResponse.error();
  }
}