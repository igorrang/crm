
import mongoose, {Schema, Document} from 'mongoose'
//import {BankAccount, Credentials,} from './types/userTypes'

export interface IUser extends Document {
  name: string;
  surname: string ;
  email: string;
  password: string;
  phone: string;
  banned: boolean;
  birthdate: Date;
  cpf: string;
  provider: string;
  documentsVerifiedStatus: string;
  emailVerified?: boolean;
  metadata: {
    needsCadastralUpdate: boolean
  };
  phoneVerified?: boolean ;
  
 
}

export interface IUserFromGoogle
    extends Omit<IUser, 'cpf' | 'password' | 'phone' | 'birthdate'> {
        phone?:string;
        cpf?: string;
        birthdate?: Date;
    }


const userSchema = new Schema < IUser| IUserFromGoogle> (
    {
        name :String,
        surname: String,
        email:{ type:String, index: {unique: true}},
        phone: String,
        banned: Boolean,
        birthdate: Date,
        cpf: String,
        emailVerified: Boolean,
        provider: String,
        metadata:{
            needsCadastralUpdate: Boolean,
        },
        phoneVerified: Boolean,
        documentsVerifiedStatus: {
            type: String,
            default: 'NOT_VERIFIED'
        },

      
    }
)

const User =
    mongoose?.models?.User ||
    mongoose.model<IUser | IUserFromGoogle>('User', userSchema);

export default User;