import {NextRequest, NextResponse} from 'next/server'
import VerificationService from '@/service/VerificationService'
import {VerificationDto} from '@/models/types/verificationTypes'
import RouteUtils from '@/service/utils/RouteUtils'
import {getServerSession} from 'next-auth'
import {nextAuthOption} from '@/service/utils/AuthOptions'


export async function PUT(request: NextRequest) {
    const session = await getServerSession(nextAuthOption)
    if (!session) {
        return RouteUtils.UnauthorizedResponse
    }

    const verificationDto: VerificationDto = await request.json()

    try{
        await VerificationService.verifyCode(verificationDto.code)
        return NextResponse.json({status: 200})
    } catch(error){
        return NextResponse.json({status: 400})
    }

}