import User from '/Users/igorrangelkonvictus/crm/frontend/src/models/User'
import { VerifyUserEmailRequest } from "@/models/types/userTypes";
import { NextResponse, NextRequest } from "next/server";
import {VerificationCodeStatuses, VerificationCodeTypes} from '@/models/VerificationCode' 
import UserService from '@/models/User'  
import VerificationService from "@/service/VerificationService";

export async function POST (request: NextRequest) {
    const validateUserEmailRequest: VerifyUserEmailRequest = await request.json()

    if(!validateUserEmailRequest.email){
        return NextResponse.json('Email is required', {status:400})
    }
  

    if(!validateUserEmailRequest.code) {
        return NextResponse.json('Verification code is required', {status:400})
    }

    try {
        const verification = await VerificationService.findVerificationCodes(
            validateUserEmailRequest.code,
            VerificationCodeTypes.EMAIL_VERIFICATION
        )
        if (verification?.userRef?.email === validateUserEmailRequest.email){
            await VerificationService.updateVerificationCodes(
                validateUserEmailRequest.code,
                VerificationCodeStatuses.VERIFIED
            )
          await User.updateOne(
            {email: validateUserEmailRequest.email},
            {$set: {emailVerified: true}}
          )
          return Response.json({message: 'Código'})
        } else {
            return NextResponse.json({message: 'Código invalido'}, {status: 400})
        }
    } catch(error) {
        console.log(error)
        return Response.json({error})
    }
}