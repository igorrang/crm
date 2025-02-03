import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/service/lib/mongodb'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const { db } = await connectToDatabase()

    const existingUser = await db.collection('users').findOne({ email })

    return NextResponse.json({ exists: !!existingUser })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao verificar email' },
      { status: 500 }
    )
  }
}