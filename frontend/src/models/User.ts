import mongoose, { Schema, Document } from 'mongoose';
import {  Credentials } from './types/userTypes';

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  phone: string;
  banned: boolean;
  birthdate: Date;
  cpf: string;
  emailVerified?: boolean;
  credentials: Credentials | null;
  provider: String;
  metadata: {
    needsCadastralUpdate: boolean;
  };
  phoneVerified?: boolean;
}

export interface IUserFromGoogle
  extends Omit<IUser, 'phone' | 'birthDate' | 'cpf' | 'credentials'> {
  phone?: string;
  cpf?: string;
  birthDate?: string;
}

const userSchema = new Schema<IUser | IUserFromGoogle>(
  {
    name: String,
    surname: String,
    email: { type: String, index: { unique: true } },
    phone: String,
    banned: Boolean,
    birthdate: Date,
    cpf: String,
    emailVerified: Boolean,
    credentials: {
      password: String,
      salt: String,
    },
  
    provider: String,
    metadata: {
      needsCadastralUpdate: Boolean,
    },
    phoneVerified: Boolean,
  
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose?.models?.User ||
  mongoose.model<IUser | IUserFromGoogle>('User', userSchema);

export default User;
