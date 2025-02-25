import { NextResponse } from 'next/server'
import { connectMongoDB} from '@/service/lib/mongodb'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const db = await connectMongoDB(); // Agora `db` contém `mongoose.connection`
    const existingUser = await db.collection('users').findOne({ email });

    return NextResponse.json({ exists: !!existingUser })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao verificar email' },
      { status: 500 }
    )
  }
}