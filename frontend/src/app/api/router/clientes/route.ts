import { Schema } from 'mongoose';
import {CreateUserSchema} from '../../../../models/CreateUserSchema';
import { NextResponse, NextRequest} from 'next/server';
import {
  CreateUserDto,
  UpdateUserDto,
  UserProvider,
} from '../../../../models/types/userTypes';
import { getServerSession } from 'next-auth';
import { NextAuthOptions } from 'next-auth';
export async function POST(request:NextRequest) {
  const createUserDto: CreateUserDto = await request.json()

  try {
    await CreateUserSchema.validate(createUserDto)
  }catch{
    
  }

}