<<<<<<< HEAD
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
import { nextAuthOption } from '@/service/utils/AuthOptions';
import {
  DATABASE_ERRORS,
  DatabaseServerError
} from '@/service/utils/Errors';

export async function POST(request: NextRequest) {
  const createUserDto: CreateUserDto = await request.json();

  try {
    await CreateUserSchema.validate(createUserDto);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }

  try {
    const user = await UserService.createUser({
      ...createUserDto,
      provider: UserProvider.EMAIL_PASSWORD,
    });
    if (!user) {
      return NextResponse.json({ status: 500 });
    }
    //Remove credentials from response
    user.credentials = null;
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    let asDatabaseError = error as DatabaseServerError;
    if (asDatabaseError.code === DATABASE_ERRORS.DUPLICATED_KEY) {
      if (asDatabaseError.keyPattern?.email) {
        return NextResponse.json(
          {
            error:
              'O email escolhido já possui uma conta associada. Verique as opções de login ou de recuperação de senha caso necessário.',
          },
          { status: 400 }
        );
      } else if (asDatabaseError.keyPattern?.cpf) {
        return NextResponse.json(
          {
            error:
              'O CPF escolhido já possui uma conta associada. Verique as opções de login ou de recuperação de senha caso necessário.',
          },
          { status: 400 }
        );
      } else if (asDatabaseError.keyPattern?.phone) {
        return NextResponse.json(
          {
            error:
              'O telefone escolhido já possui uma conta associada. Verique as opções de login ou de recuperação de senha caso necessário.',
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          error:
            'Possivelmente algum dos seus dados já pertençam a outro usuário. Em caso de dúvidas, entre em contato com o nosso SAC.',
        },
        { status: 400 }
      );
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Authentication
  const session = await getServerSession(nextAuthOption);
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
  const session = await getServerSession(nextAuthOption);
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
  const session = await getServerSession(nextAuthOption);
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

