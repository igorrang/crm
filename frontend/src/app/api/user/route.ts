import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/service/UserService';
import {
  CreateUserDto,
  UpdateUserDto,
  UserProvider,
} from '@/models/types/userTypes';
import { CreateUserSchema } from '@/app/schemas/CreateUserSchema';
import RouteUtils from '@/service/utils/RouteUtils';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/service/utils/AuthOptions';
import {
  DATABASE_ERRORS,
  DatabaseServerError
} from '@/service/utils/Errors';

export async function POST(request: NextRequest) {
  try {
    const createUserDto = await request.json();
    console.log(createUserDto);
    // Validação dos dados
    await CreateUserSchema.validate(createUserDto);
    console.log('passou da validação');

    // Criação do usuário
    const user = await UserService.createUser(createUserDto);
    console.log('passou da criação do usuário');
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json({ error: error.message || 'Erro ao criar usuário' }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  // Authentication
  const session = await getServerSession(nextAuthOptions);
  if (!session?.user) {
    return RouteUtils.UnauthorizedResponse;
  }

  const user = await UserService.findUserById(session.user.id);
  if (user) {
    return NextResponse.json(user, { status: 201 });
  }
  return NextResponse.json({ message: 'User not found' }, { status: 404 });
}

export async function PATCH(request: NextRequest) {
  // Authentication
  const session = await getServerSession(nextAuthOptions);
  if (!session?.user) {
    return RouteUtils.UnauthorizedResponse;
  }

  const updateUserDto: UpdateUserDto = await request.json();
  try {
    const user = await UserService.findUserById(session.user.id);

    if (user.provider === UserProvider.EMAIL_PASSWORD) {
      await UserService.patchUser(session.user.id, updateUserDto);
      return NextResponse.json(user, { status: 201 });
    } else {
      return NextResponse.json(
        {
          message:
            'Usuário já realizou sua atualização cadastral ou não necessita desta atualização',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(nextAuthOptions);
  if (!session?.user) {
    return RouteUtils.UnauthorizedResponse;
  }
  try {
    const result = await UserService.deleteUser(session.user.id);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
