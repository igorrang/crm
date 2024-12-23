import {createHash} from 'crypto';
import {sendEmail} from './lib/NodeMailer'
import {addHours} from 'date-fns'
import VerificationCode, {VerificationCodeStatuses,VerificationCodeTypes,} from '@/models/VerificationCode';
import {connectMongoDB} from '@/service/lib/mongodb';
import UserService from '@/service/UserService';

const sendVerificationCode = async (email:string) => {
    const verificationCode = createHash('sha256').update(email).digest('hex');
    VerificationCode.replaceOne(
        {email:email},
        {code: verificationCode,
            email: email,
        },
        {
            upsert: true
        }
    );

    sendEmail(email, verificationCode)
} 

const insertCodeOnDatabase = async (
    code: string ,
    type: VerificationCodeTypes,
    userId: string 
) => {
    try{
        await connectMongoDB()
        await VerificationCode.create({
            code,
            type,
            userRef: userId,
            status: VerificationCodeStatuses.USABLE,
            experiesAt: addHours(new Date(),24),
        })
}catch(error){
    console.log(error)
}
}




const verifyCode = async (code:string) => {
    try{
        await connectMongoDB();
        const verificationCodeObj= await VerificationCode.findOne({code:code})
        await UserService.markUserAsVerified(verificationCodeObj.email)
    } catch (error){
        console.log(error)
    }
}

const generateCode = (type: VerificationCodeTypes) => {
    const charcterAndNumbers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const onlyDigits = '0123456789'

    const generateRandomString = (character: string, length:number): string => {
        let result = '';
         const charactersLenaght = character.length
         for (let i = 0; i < length; i++)
         {
            result += character.charAt(Math.floor(Math.random() * charactersLenaght))
         }

         return result;
    }

    if (type === VerificationCodeTypes.FORGOT_PASSWORD){
        return generateRandomString(charcterAndNumbers, 6)
    } else if (type === VerificationCodeTypes.PHONE_VERIFICATION) {
        return generateRandomString(onlyDigits, 6)

    } else if(type === VerificationCodeTypes.EMAIL_VERIFICATION) {
        return generateRandomString(charcterAndNumbers, 16)
        
    }
}

const findVerificationCodes = async (
    code: string,
    type: VerificationCodeTypes,
) => {
    try{
        await connectMongoDB();
        const verificationCode = await VerificationCode.findOne({
            type,
            status: VerificationCodeStatuses.USABLE,
            expiresAt: {$gt: new Date()}
        })
         .sort({ createdAt: -1})
         .populate('userRef')
         if(verificationCode.code === code){
            return verificationCode
         }else{
            return null
         }

    } catch (error) {
        console.log(error)
    }
}

const updateVerificationCodes = async (
    code: string,
    newStatus: VerificationCodeStatuses
) => {
    try{
        await connectMongoDB();
        const  verificationCode = await VerificationCode.updateOne(
            {code},
            {$set: {status: newStatus}}
        )
        return verificationCode
} catch (error){
    console.log(error)

}
}

const VerificationService = {
    sendVerificationCode,
    verifyCode,
    generateCode,
    findVerificationCodes,
    updateVerificationCodes,
    insertCodeOnDatabase
}

export default VerificationService