import {createHash} from 'crypto'
import {addHours} from 'date-fns'
import {sendEmail} from './lib/NodeMailer'
import VerificartionService from './VerificationService'
import mongoose from 'mongoose';
import VerificationCode,{VerificationCodeStatuses,VerificationCodeTypes} from '@/models/VerificationCode';
import User, {IUser,IUserFromGoogle} from '../models/User'
import { connectMongoDB } from './lib/mongodb';
import { Resend } from 'resend';
import {EmailVerificationTemplate} from '@/components/EmailVerificationTemplate'
import {
    CadastralUpdateFromGoogleSource,
    CreateUserDeleteReasonDTO,
    CreateUserDto,
    CreateUserDtoFromGoogle,
    UpdateUserBankAccountDto,
    UpdateUserDto,
    VerifyDocumentsDto,
  } from '@/models/types/userTypes';

  import { pbkdf2Sync, randomBytes } from 'crypto';
import Email from 'next-auth/providers/email';

const resend = new Resend (process.env.RESEND_API_KEY)


const findUserById = async (id:string) => {
    await connectMongoDB();
    const user = await User.findById(id).select(['-credentials']);
    if (user){
        return user;
    }
    return null;

}

const createUser = async (createUserDto:CreateUserDto) => {
    await connectMongoDB();

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = await hashPassword(createUserDto.password, salt);
    
    let dbData: IUser | null = null;
    dbData = await User.create({
        name: createUserDto.name,
        surname: createUserDto.surname,
        email: createUserDto.email,
        cpf: createUserDto.phone,
        banned: false,
        birthdate: createUserDto.birthdate,
        emailVerified: true,// trocar para false depois
        credentials :{
            password: hashedPassword,
            salt: salt,
        },
    })

    if (!dbData){
        return null;
    }

    const code : string = VerificartionService.generateCode(
        VerificationCodeTypes.EMAIL_VERIFICATION
    );

    await VerificartionService.insertCodeOnDatabase(
             code,
            VerificationCodeTypes.EMAIL_VERIFICATION,
             dbData._id
    );
    
    resend.emails.send({x
        from: '<ti@konvictus.com.br>',
        to: [dbData.email],
        subject: 'Verificação de email',
        react: EmailVerificationTemplate({
            username:dbData.name,
            link: `${process.env.BASE_URL}/confirmar-email?email=${dbData.email}&code=${code}`,
        }),
        text: 'Verificação de email',
    })

    return dbData;
}

const createUserFromGoogle = async (createUserDto: CreateUserDtoFromGoogle) => {
    await connectMongoDB()
}