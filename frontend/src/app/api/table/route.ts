import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const res = await axios.get('http://app/tables');
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
    const res = await axios.post('http://app/tables', body);
    const data = res.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting table data:', error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const res = await axios.put('http://app/tables', body);
    const data = res.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting table data:', error);
    return NextResponse.error();
  }
}