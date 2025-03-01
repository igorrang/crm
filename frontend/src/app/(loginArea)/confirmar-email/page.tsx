'use client'
import { AiOutlineClose } from 'react-icons/ai';
import {Form, Formik , FormikProps} from 'formik'
import { postData } from '@/service/APIService'
import { useRouter , useSearchParams} from 'next/navigation'
import {Input} from '@/components/Input'
import { Button } from '@/components/Button'
import { Box } from '@/components/Box/index'
import {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { FaRegSmileBeam } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

const verifyCodeSchema = yup.object().shape ({
    code: yup.string().required('O campo código de verificação é obrigatório')
})

export default function ConfirmEmailPage(){
    const router = useRouter()
    const [queryParams, setQueryParams] = useState({code:'',email:''})
    const searchParams = useSearchParams()

    useEffect(()=> {
        const code = searchParams.get('code')
        const email = searchParams.get('email')

        if (code && email) {
            setQueryParams({code, email})
        }
    }, [searchParams]
)
const handleSubmit = async (values: {code:string}) => {
    try {
        await postData(
            {
               email: queryParams?.email,
               code: values.code, 
            },
            '/user/verify-email'
        )
        toast.success('Email verificado com sucesso!')

        router.push('/user/dashboard')
    } catch (error){
        toast.error('Ocorreu um erro ao verificar o código de verificação')
    }
}

const resendCode = async () => {
    try {
        toast.custom((t: any) => (
            <div 
            className={`w-[760px] h-[56px] bg-[#758798] p-4 flex gep-3 items-center rounded-md justify-center  ${t.visible ? 'animate-enter' : 'animate-leave'}`}
            >
                <FaRegSmileBeam size={24}/>
                <p className=' text-xl font-[#0A3622]'>
                    codigo de verificação reenvidade
                </p>
                <Button onClick={() => toast.dismiss(t.id)}>
                    <AiOutlineClose size={24}/>
                </Button>
            </div>
        ))

        router.push('/login')
    } catch (error){
        toast.error('Ocorreu um erro ao enviar o e-mail de redefinição de senha.')
    }
 }

 return (
    <div className='flex flex-1 items-center justify-center flex-col mx-40 mt-[50px] 15inch:mt-[25px]'>
        <div className='mt-[50px] 15inch:mt-2'>
            <Link href={'/comprar'} className='cursor-pointer'>
                <Image
                src='/images/Konvictsu'
                alt='logo'
                width={197}
                height={52}
                loading='eager'
                />
            </Link>
        </div>
        <main className='w-full p-4 flex flex-1 gap-24 justify-center items-center 15inch:gap-12 15inch:mt-2'>
            <Box className='w-[612px]'>
                <h1 className='text-3xl'>Code de verificação</h1>
                <Formik
                initialValues={{
                    code: queryParams?.code || '',
                }}
                onSubmit={handleSubmit}
                validationSchema={verifyCodeSchema}
                enableReinitialize
                >
                    {({setFieldValue}: FormikProps<{code: string}>) =>(
                        <Form className='flex flex-col gap-6 mt-8 mb-[35px]'>
                            <Input 
                                type='text'
                                placeholder='insira o codigo enviado por e-mail aqui'
                                onChange={(e)=> setFieldValue('code', e.target.value)}
                                name='code'
                                id='code'
                            />

                            <Button
                            variant='primary'
                            className='self-center mt-11 text-xl w-[270px] h-[56px]'
                            type='submit'
                            >
                                confirmar
                            </Button>
                            <Button
                            className='underline'
                            onClick={resendCode}
                            type='button'
                            >
                                reenviar codigo
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </main>

    </div>
 )
}