
import React, {CSSProperties} from 'react'
import {
    Body,
    Container,
    Text,
    Link,
    Img,
    Tailwind
} from '@react-email/components'

interface ForgotPasswordTemplateProps{
    username: string
    token: string
    link: string
}

export const ForgotPasswordTemplate: React.FC<
    Readonly<ForgotPasswordTemplateProps>
> = ({username, token, link}) => {
    return(
        <Tailwind>
            <Body className='bg-[#49454F] p-4 text-black w-[600px] fonst-sans mx-auto'>
                <Container className='flex flex-col items-center gap-4 min-w-[584px] mx-auto'>
                    <Container>
                        <Img
                        src=''
                        alt='logo'
                        width={134}
                        height={19}
                        className='w-[134px] h-[19px]'
                        />
                        <Container>
                            <Text>
                                0lá, <strong>{username}</strong>.<br />
                            </Text>
                            <Text>
                                Recebendo uma solicitação para redefinir sua senha de <br/>
                                Konvictus
                            </Text>
                            <Text>
                                Insira o codigo de redefição de senha a seguir
                            </Text>
                        </Container>
                        <Text>
                            Como alternativa, voce pode alterar sua senha diretamente 
                        </Text>
                        <Container className='py-3 px-6 bg-[black] text-white font-bold h-[48px] w-[153px] text-center rounded-3xl mb-[40px] mx-auto' >
                         <Link href={link} className='text-white no-underline'>
                            Alterar a senha 
                         </Link>
                        </Container>
                        <Text className='font-bold'> Não solicitou esta altereção? </Text>
                        <Text>
                            Se você não solicitou uma redefinição de senha, ignore este e-mail
                            <Link
                            href='email de verificação'
                            className='underline font-bold text-black'
                            >
                            avise-nos.
                            </Link>
                        </Text>
                            <hr className='w-full h-[2px] bg-[#FFC719] mt-4 borderd-none'/>
                        <Text className='w-full h-[2px] bg-black border-none'>
                            Do time <strong>Konvictus</strong>
                        </Text>
                    </Container>
                </Container>
            </Body>
        </Tailwind>
    )
}