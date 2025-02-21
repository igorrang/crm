import { connectMongoDB} from '@/service/lib/mongodb';
import User from '@/models/User';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectMongoDB();


  const isDevelopment = process.env.NODE_ENV === 'development'
    const email = isDevelopment? 'alexpadilha@konvictus.com' : data.email
    const password = isDevelopment? 'senha1234'  : data.password
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = pbkdf2Sync(password , salt, 1000, 64, 'sha512').toString('hex');

    const userData = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      birthdate: data.birthdate,
      banned: false,
      emailVerified: false,
      credentials: {
        password: hashedPassword,
        salt: salt,
      },
      provider: 'email'
    };

    const user = await User.create(userData);
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 