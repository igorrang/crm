import User, {IUser,IUserFromGoogle} from '/Users/igorrangelkonvictus/crm/frontend/src/models/User'
import {connectMongoDB} from './lib/mongodb'

import {
    CreateUserDto,
    CreateUserDtoFromGoogle,
    UpdateUserDto,
    CadastralUpdateFromGoogleSource,
    CreateUserDeleteReasonDTO
} from '/Users/igorrangelkonvictus/crm/frontend/src/models/types/userTypes'
import { pbkdf2Sync, randomBytes } from 'crypto';
import VerificationService from './VerificationService';
import mongoose, { UpdateQuery } from 'mongoose';
import UserDeleteReason from '@/models/UserDeleteReason';
import { VerificationCodeTypes } from '@/models/VerificationCode';
import { Resend } from 'resend';
import { EmailVerificationTemplate } from '@/components/EmailVerificationTemplate';
import { RegisterFormData } from '@/components/RegisterForm/types';

const resend = new Resend (process.env.RESEND_API_KEY)


const findUserById = async (id:string) => {
    await connectMongoDB();
    const user = await User.findById(id).select(['-credentials']);
    if (user){
        return user;
    }
    return null;

}

const createUser = async (createUserDto: CreateUserDto) => {
    await connectMongoDB();

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = await hashPassword(createUserDto.password, salt);
    
    let dbData: IUser | null = null;
    dbData = await User.create({
        name: createUserDto.name,
        surname: createUserDto.surname,
        email: createUserDto.email,
        cpf: createUserDto.cpf,
        phone: createUserDto.phone,
        banned: false,
        birthdate: createUserDto.birthdate,
        emailVerified: false,
        credentials :{
            password: hashedPassword,
            salt: salt,
        },
        provider: createUserDto.provider,
    })

    if (!dbData){
        return null;
    }

    const code : string = VerificationService.generateCode(
        VerificationCodeTypes.EMAIL_VERIFICATION
    ) as string;

        await VerificationService.insertCodeOnDatabase(
            code,
            VerificationCodeTypes.EMAIL_VERIFICATION,
            dbData._id as string
        )
    
        resend.emails.send({
            from: '<ti@konvictus.com.br>',
            to: [dbData.email],
            subject: 'Verificação de email',
            react: EmailVerificationTemplate({
            username: dbData.name,
            link: `${process.env.BASE_URL}/confirmar-email?email=${dbData.email}&code=${code}`,
            token: code
            }),
            text: 'Verificação de email',
    })

    return dbData;
}

const createUserFromGoogle = async (createUserDto: CreateUserDtoFromGoogle) => {
    await connectMongoDB()

    let dbData: IUserFromGoogle | null = null
    dbData = await User.create({
        name: createUserDto.name,
        surname: createUserDto.surname,
        email: createUserDto.email,
        banned: false,
        emailVerified: true,
        provider: createUserDto.provider,
        metadata: {needsCadastralUpdate:true},
    })

    if (!dbData){
        return null
    }

    return dbData
}

const findByEmail = async (email: string) => {
    await connectMongoDB()

    let dbData = null 
    try {
        dbData = await User.findOne({ email: email})
    } catch(error) {
        console.log(error)
    }

    if (dbData) {
        return dbData
    }

    return null
}

const findByCpf = async (cpf: string) =>{
    await connectMongoDB()

    let dbData = null

    try{
        dbData = await User.findOne({cpf:cpf})
    } catch(error){
        console.log(error)
    }

    if (dbData) {
        return dbData
    }

    return null
}

const hashPassword = async (password:string, salt: string) => {
    return pbkdf2Sync(password,salt,1000,64, 'sha512' ).toString('hex')
}

const markUserAsVerified = async (email:string) => {
    await User.updateOne({email:email}, {emailVerified:true})
}
const patchUserFromGoogleAuth = async ( 
    id: string,
    updateUserDto : CadastralUpdateFromGoogleSource) =>
        {
            await connectMongoDB()
            let updateQuery: UpdateQuery<IUser> = {}

            if(updateUserDto.cpf) {
                updateQuery = {
                    cpf: updateUserDto.cpf,
                }
            }
            if (updateUserDto.cpf) {
                updateQuery = {
                    cpf: updateUserDto.cpf,
                }
            }
            return await User.findByIdAndUpdate(
                id,
                {
                    ...updateUserDto, metadata: {needsCadastralUpdate:false}
                },
                {new:true}
            )
        } 


        const patchUser = async (id:string , updateUserDto:UpdateUserDto ) => {
            await connectMongoDB()
            let updateQuery: UpdateQuery<IUser> = {};
        
            if (updateUserDto.email) {
                updateQuery = {
                    email: updateUserDto.email
                }
            }
            if (updateUserDto.phone){
                updateQuery = {
                    ...updateQuery,
                    phone: updateUserDto.phone
                }
            }
            return await User.findByIdAndUpdate(id,{updateUserDto}, {new:true});
        }

const updateUserPasswordById = async (
    id: string,
    salt: string,
    password: string
)=> {
    try {
        await User.updateOne(
            { _id: id},
            {
                $set: {
                    credentials:{
                        salt,
                        password,
                    },
                },
            }
        )
    }catch (error) {
        console.log(error)
    }
}

const deleteUser = async (id:string ) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID invalidp')
    }

    const user = await User.findById(id)
    if(!user){
        throw new Error('User not found')
    }
    await User.deleteOne({_id: id})

    return {success: true, message:'User delete', userId: id}
}

const createUserDeleteReason = async (userDeleteReasonDto: CreateUserDeleteReasonDTO,
    userId: string
) => {
    await connectMongoDB()

    const user = await User.findById(userId)
    if(!user){
        throw new Error('User not FOUND')
    }

    const completeUserDeleteReasonDto = {
        ...userDeleteReasonDto,
        userId: userId,
    }
    const userDeleteReason = await  UserDeleteReason.create(
        completeUserDeleteReasonDto
    )
    return userDeleteReason
}

const register = async (data: RegisterFormData) => {
  await connectMongoDB();
  
  const cpfSemMascara = data.cpf.replace(/[-.]/g, '');
  const phoneSemMascara = data.phone.replace(/\D/g, '');
  
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = await hashPassword(data.password, salt);

  const userData = {
    name: data.name,
    surname: data.surname,
    email: data.email,
    cpf: cpfSemMascara,
    phone: phoneSemMascara,
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
  return user;
}

export const UserService = {
    findUserById,
    findByCpf,
    createUser,
    createUserFromGoogle,
    hashPassword,
    findByEmail,
    markUserAsVerified,
    patchUserFromGoogleAuth,
    patchUser,
    deleteUser,
    createUserDeleteReason,
    updateUserPasswordById,
    register,
    
}