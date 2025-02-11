import {NextRequest, NextResponse} from 'next/server'
import VerificationService from '@/service/VerificationService'
import { VerificationCodeTypes } from '@/models/VerificationCode'
import { IUser } from '@/models/User'
import UserService from '@/service/UserService'
import {getServerSession} from 'next-auth'
import { nextAuthOption } from '@/service/utils/AuthOptions'
import RouteUtils from '@/service/utils/RouteUtils'


export async function POST(request: NextRequest) {
    const session = await getServerSession(nextAuthOption)
        if (!session?.user) {
            return RouteUtils.UnauthorizedResponse
        }

        try {
            const user: IUser = await UserService.findUserById(session.user.id)
            if(user.phoneVerified){
                return NextResponse.json({message: 'usuário já é verificado por sms'}, {status:400})
            }

           
        
        } catch(error) {
            console.log(error)
        }
} 