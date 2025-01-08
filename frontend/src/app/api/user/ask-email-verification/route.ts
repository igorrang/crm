import { NextRequest, NextResponse } from "next/server";
import VerificationService from '@/service/VerificationService'
import { VerificationCodeTypes } from "@/models/VerificationCode";
import { IUser } from "@/models/User";

import UserService from '@/service/UserService'
import {getServerSession} from 'next-auth'

import {Resend} from 'resend'
import { EmailVerificationTemplate } from "@/components/EmailVerificationTemplate";
import { nextAuthOption } from "@/service/utils/AuthOptions";
import RouteUtils from "@/service/utils/RouteUtils";

const resend  = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
    const session = await getServerSession(nextAuthOption)
    if (!session?.user) {
       return RouteUtils.UnauthorizedResponse
    }
    console.log(session.user)

    try {
        const user: IUser = await UserService.findUserById(session.user.id)
        if(user.emailVerified){
            return NextResponse.json(
                {message: 'Email already verified'},
                {status: 400}
            )
        }
        const code: string = VerificationService.generateCode(
            VerificationCodeTypes.EMAIL_VERIFICATION
        ) as string;

        await VerificationService.insertCodeOnDatabase(
            code,
            VerificationCodeTypes.EMAIL_VERIFICATION,
            user.id
        )
        resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [user.email],
            subject: 'Recuperação de Senha - Link Milhas',
            react: EmailVerificationTemplate({
              username: user.name,
              link: `http://localhost:3000/recuperar-senha?code=${code}&email=${user.email}`,
              token: code,
            }),
            text: 'Recuperação de Senha - Konvictus',
       })

       return Response.json({message: 'SMS enviado com sucesso '})
    } catch(error){
        console.log(error)
        return Response.json({message: 'Erro ao enviar SMS'}, {status: 500})
    }

}

