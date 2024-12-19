import {Resend} from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
import {UnreadMessagesTemplate} from '@/components/unreadmessages/UnreadMessagesTemplate'


export const sendUnreadMessagesEmail = async (to:string, username: string, unreadMessagesOf:string, chatId:string)=>{
    await resend.emails.send({
        from:'email do alek',
        to:to,
        subject: `Voce possui mensagens não lidas de  ${unreadMessagesOf}`,
        react: UnreadMessagesTemplate({
                username,
                unreadMessagesOf,
                link: `${process.env.BASE_URL}/chat/${chatId}`
        }),
        text: 'recuperação de senha crm '
    })
}