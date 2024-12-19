import { Schema } from 'mongoose';
import {CreateUserSchema} from '@/Schema/UserSchema';
import { NextResponse, NextRequest} from 'next/server';
import {
  CreateUserDto,
  UpdateUserDto,
  UserProvider,
} from '/Users/igorrangelkonvictus/crm/frontend/src/app/pages/api/models/types/userTypes';

export async function POST(request:NextRequest) {
  const createUserDto: CreateUserDto = await request.json()

  try {
    await CreateUserSchema.validate(createUserDto)
  }

}