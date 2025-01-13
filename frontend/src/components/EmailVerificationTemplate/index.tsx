import React,{CSSProperties} from 'react'
import {
    Body, 
    Container,
    Text,
    Link,
    Img,
    Tailwind
} from '@react-email/components'


interface EmailVerificationTemplateProps{
    username: string;
    link: string;
    token:string;
}

export const EmailVerificationTemplate: React.FC <
 Readonly<EmailVerificationTemplateProps>
 > = ({ username, link}) => {
    return(
        <Tailwind>
            <Body className ='bg-[#49454F] p-4 text-black w-[600px] font-sans mx-auto'>
                <Container className='flex flex-col items-center gap-4 min-w-[584px] mx-auto'>
                    <Container style={logoContainer}>
                        <Img
                        src=''
                        alt='logo'
                        width={134}
                        height={19}
                        className='w-[134px] h-[19px]'
                        >
                        </Img>
                    </Container>

                    <Container className='bg-white rounded-[40px] p-8 gap-3 w-full min-w-[584px]'>
                        <Text>
                            Olá , <strong>{username}</strong>
                        </Text>
                        <Text> 
                            Passando aqui para verificar seu e-mail da <strong></strong>
                        </Text>
                        <Text>
                            Clique no link a seguir para validação:
                        </Text>
                        <Container className='py-3 px-6 bg-[#F2994A] text-black font-bold h-[48px] w-[153px] text-center rounded-3xl mb-[40px] mx-auto'>
                            <Link href={link} className='text-black no-underline'>
                                Verificação e-mail
                            </Link>
                        </Container>
                    <Container>
                        <hr className='w-full h-[2px] bg-black border-none' />
                        <Text className='text-center text-[#FFC719] text-lg'>
                        Copyright © 2024 Konvictus <br /> Crm | All Rights Reserved{' '}
                        </Text>
                    </Container>
                    
                    </Container>
                </Container>
            </Body>
        </Tailwind>
    )
}

const logoContainer: CSSProperties = {
    alignSelf: 'center',
    width: 'fit-content',
    marginBottom: '16'
}