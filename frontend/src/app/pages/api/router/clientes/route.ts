import { Schema } from 'mongoose';
import {CreateUserSchema} from '/Users/igorrangelkonvictus/crm/frontend/src/app/pages/api/models/CreateUserSchema';
import { NextResponse, NextRequest} from 'next/server';
import {
  CreateUserDto,
  UpdateUserDto,
  UserProvider,
} from '/Users/igorrangelkonvictus/crm/frontend/src/app/pages/api/models/types/userTypes';
import { getServerSession } from 'next-auth';
import { NextAuthOptions } from 'next-auth';
export async function POST(request:NextRequest) {
  const createUserDto: CreateUserDto = await request.json()

  try {
    await CreateUserSchema.validate(createUserDto)
  }

}