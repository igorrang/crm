import { ForgotPasswordRequest , UserProvider} from '@/models/types/userTypes';
import {ForgotPasswordTemplate} from '@/components/ForgotPasswordTemplate'


import {Resend} from 'resend'
import { NextResponse, NextRequest } from 'next/server'
import VerificationService from '@/service/VerificationService'
import {VerificationCodeTypes} from '@/models/VerificationCode'
import {IUser} from '@/models/User'

import {UserService} from '@/service/UserService'

const resend = new Resend(process.env.RESEND_API_KEY) 

export async function POST(request: NextRequest) {
    const forgotPasswordRequest: ForgotPasswordRequest = await request.json()
    
    if(!forgotPasswordRequest.email){
        return NextResponse.json({message: 'Email is required'}, {status: 400})
    }

    try {
        const user : IUser = await UserService.findByEmail(
            forgotPasswordRequest.email
        )

        if (!user || user.provider !== UserProvider.EMAIL_PASSWORD){
            return NextResponse.json(
                {
                    message: 'Verifique se seu e-mail está correto ou se você não  '
                },
                {status: 404}

            )
        }

        const code: string = VerificationService.generateCode(
            VerificationCodeTypes.FORGOT_PASSWORD
        ) as string 
        
     await VerificationService.insertCodeOnDatabase(
        code,
        VerificationCodeTypes.FORGOT_PASSWORD,
        user.id
     )

     resend.emails.send({
        from : 'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Recuperação de senha - Crm',
        react: ForgotPasswordTemplate({
            username: user.name,
            link: `http://localhost:3000/recuperar-senha?code=${code}&email=${user.email}`,
            token: code 
        }),
        text: 'Recuperação de Senha - Konvictus'
     })
     return Response.json({message: 'E-mail enviado com succes'})
    }  catch(error) {
        console.log(error)
        return Response.json(error, {status: 500})
    }
}