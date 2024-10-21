import { NextResponse } from 'next/server';
import axios from 'axios';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await axios.post('http://frontend-backend-ff5606:5050/filtroTable', body);
    const data = res.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting table data:', error);
    return NextResponse.error();
  }
}

