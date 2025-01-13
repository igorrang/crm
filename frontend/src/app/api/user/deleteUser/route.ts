import {CreateUserDeleteReasonDTO} from '@/models/types/userTypes'
import {CreateUserDeleteSchema} from '/Users/igorrangelkonvictus/crm/frontend/src/app/schemas/CreateUserDeleteSchema'
import UserService from '@/service/UserService'
import { nextAuthOption} from '@/service/utils/AuthOptions'
import RouteUtils from '@/service/utils/RouteUtils'
import {getServerSession} from 'next-auth'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
    const session = await getServerSession(nextAuthOption)
    if(!session?.user){
        return RouteUtils.UnauthorizedResponse
    }

    const userDeleteReasonDto: CreateUserDeleteReasonDTO = await request.json(
    )
    try {
        await CreateUserDeleteSchema.validate(userDeleteReasonDto)
    } catch (error) {
        return NextResponse.json(error,{status: 400})
    }

    try {
        const userDeleteReason = await UserService.createUserDeleteReason(userDeleteReasonDto, session.user.id)
        if (!userDeleteReason) {
            return NextResponse.json({message: 'User not found'}, {status: 404})
        }
        return NextResponse.json(userDeleteReason, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, {status : 500})
    }
}