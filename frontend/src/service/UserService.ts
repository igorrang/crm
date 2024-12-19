import { VerificationCodeTypes } from '@/models/VerificationCode';
import User, {IUser,IUserFromGoogle} from '/Users/igorrangelkonvictus/crm/frontend/src/app/pages/api/models/User'
import { connectMongoDB } from './lib/mongodb';
import { CadastralUpdateFromGogleSource,CreateUserDto } from '@/app/pages/api/models/types/userTypes';
import { Resend } from 'resend';
import {EmailVerificationTemplate} from '@/components/EmailVerificationTemplate'
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
    const hashedPassword = await hashPassword(createUserDto.password,salt)
    
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
            salt: salt
        }
    })

    if (!dbData){
        return null;
    }

    const code: string = VerificationService.generateCode(
        VerificationCodeTypes.EMAIL_VERIFICATION
    );

    await VerficationService.insertCodeOnDatabase(
             code,
            VerificationCodeTypes.EMAIL_VERIFICATION,
             dbData._id
    )
    

    return dbData;
}