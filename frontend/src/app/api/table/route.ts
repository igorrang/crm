import { NextResponse } from 'next/server';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()

export async function GET() {
  try {
    const res = await axios.get('http://localhost:3000/table');
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
    const res = await axios.post('http://localhost:3000/table', body);
    const data = res.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting table data:', error);
    return NextResponse.error();
  }
}