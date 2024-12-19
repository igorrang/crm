import {Divider} from '@/components/Divider/divider'


interface UnreadMessagesTemplateProps {
    username: string 
    unreadMessagesOf: string
    link: string
}

export const UnreadMessagesTemplate:  React.FC<
Readonly<UnreadMessagesTemplateProps>
> = ({username, unreadMessagesOf, link}) =>{
 return (
        <div>
            <h1>Olá {username}</h1>
            <p>Voce possui mensagens não lidas de {unreadMessagesOf}</p>
            <a href={link}>Clique aqui para ver as mensagens</a>
            <Divider></Divider>
        </div>
 )
}