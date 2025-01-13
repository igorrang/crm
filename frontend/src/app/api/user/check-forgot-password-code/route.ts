import {ValidateForgotPasswordCodeRequest
} from  '@/models/types/userTypes'
import {NextRequest, NextResponse} from 'next/server'
import VerificationService from '@/service/VerificationService'
import {VerificationCodeTypes} from '@/models/VerificationCode'

export async function POST(request: NextRequest) {
    const validateForgotPasswordRequest: ValidateForgotPasswordCodeRequest = await request.json()

    if (!validateForgotPasswordRequest.email) {
        return NextResponse.json('email is required', {status: 400})
    }

    if (!validateForgotPasswordRequest.code){
        return NextResponse.json('code is required', {status: 400})
    }

    try {
        const verification = await VerificationService.findVerificationCodes(validateForgotPasswordRequest.code, VerificationCodeTypes.FORGOT_PASSWORD)
        if (verification?.userRef?.email === validateForgotPasswordRequest.email){
            return Response.json({message: 'codigo invalido'}, {status: 400})
        }
    } catch (error){
        console.log(error)
        return Response.json({error})
    }
}