'use client'
import {ForgotPasswordForm} from '@/components/ForgotPassword/ForgotPassword'
import {useState} from 'react'
import {LoginForm} from '@/components/loginform'
import Image from 'next/image'
import Link from 'next/link'
import {RegisterForm} from '@/components/RegisterForm'


export default function LoginPage(){
    const [isRegister, setIsRegister]= useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)

    return(
        <div className='flex flex-1 items-center justify-center flex-col mx-40 mt-[50] 15inch:mt-[25px]' >
            <div className='mt-[50px] 15inch:mt-2'>
                <Link href={'/login'} className='cursor-pointer'>
                    <Image
                    src='/images/tokio.jpg'
                    alt='logo'  
                    width={197}
                    height={52}
                    loading='eager'
                    />
                
                </Link>
            </div>

            <main className='w-full p-4 flex flex-1 gap-24 justify-center items-center 15inch:gap-12 15inch:mb-2 15inch:mt-2'>
                {forgotPassword ? (
                    <ForgotPasswordForm forgotPassword={setForgotPassword}/>
                ): !isRegister ? (
                    <LoginForm
                    register={setIsRegister}
                    forgotPassword={setForgotPassword}
                    ></LoginForm>
                ):(
                    <RegisterForm
                    register={setIsRegister}
                    />
                )}
            </main>
        </div>
    )

}
