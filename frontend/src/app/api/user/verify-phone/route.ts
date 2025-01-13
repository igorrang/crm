import {ObjectId} from 'mongodb'
import {VerifyUserPhoneRequest} from '@/models/types/userTypes'
import {NextRequest, NextResponse} from 'next/server'
import VerificationService from '@/service/VerificationService'
import {VerificationCodeStatuses, VerificationCodeTypes} from '@/models/VerificationCode'
import User from '@/models/User'
import {getServerSession} from 'next-auth'
import {nextAuthOption} from '@/service/utils/AuthOptions'
import RouteUtils from '@/service/utils/RouteUtils'

export async function POST(request: NextRequest) {
    const validateUserEmailRequest : VerifyUserPhoneRequest = await request.json()

    const session = await getServerSession(nextAuthOption)
    if(!session?.user){
        return RouteUtils.UnauthorizedResponse
    }

    const userId = session.user.id 

    if (!validateUserEmailRequest.code) {
        return NextResponse.json('verification code is req ', {status: 400})
    }

    try {
        const verification = await VerificationService.verificationPhoneCode(userId, validateUserEmailRequest.code,VerificationCodeTypes.PHONE_VERIFICATION)
        if(!verification){
            return NextResponse.json({message: 'Invalid code'}, {status: 400})
        }

        await VerificationService.updateVerificationCodes(validateUserEmailRequest.code, VerificationCodeStatuses.VERIFIED)
        await User.updateOne({_id: new ObjectId(userId)}, {$set: {phonrVerified: true }})

        return NextResponse.json({message: 'Phone verified'})
    }catch (error) {
        console.log(error)
        return Response.json({error})
    }
}

