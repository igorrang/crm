import { ChangePasswordRequest } from '../../../../models/types/userTypes';
import { Schema } from 'mongoose';
import { NextRequest, NextResponse  } from "next/server";
import VerificationService from '@/service/VerificationService'
import{VerificationCodeStatuses, VerificationCodeTypes} from '@/models/VerificationCode'
import {randomBytes} from 'crypto'

import UserService from '@/service/UserService'       
import {ChangePasswordSchema} from '/Users/igorrangelkonvictus/crm/frontend/src/app/schemas/ChangePasswordSchema'
export async function POST(request: NextRequest){
    const changePasswordRequest: ChangePasswordRequest = await request.json()

    if(!changePasswordRequest.email) {
        return NextResponse.json('Email is required', {status:400})
    }
    if(!changePasswordRequest.code) {
        return NextResponse.json('Verificartion code is required',{status: 400})
    }

    try {
        await ChangePasswordSchema.validate({password: changePasswordRequest.password, confirmPassword: changePasswordRequest.passwordConfirmation})
    } 
    catch (error){
        return Response.json({error: (error as Error).message})
    }

    try {
        const verification = await VerificationService.findVerificationCodes(changePasswordRequest.code, VerificationCodeTypes.FORGOT_PASSWORD)
        if(!verification){
            return NextResponse.json({message: 'codigo valido'}, {status: 400})
        }

        if(verification?.userRef?.email === changePasswordRequest.email){
            const salt = randomBytes(16).toString('hex')
            const hash = await UserService.hashPassword(changePasswordRequest.password,salt)
            await UserService.updateUserPasswordById(verification.userRef.id,salt,hash)
            await VerificationService.updateVerificationCodes(changePasswordRequest.code, VerificationCodeStatuses.VERIFIED)
        } else {
            return NextResponse.json({message:'nao foi possivel trocar a senha'}, {status:400})
        }
    } catch(error) {
        console.log(error)
        return Response.json({error})
    }
}