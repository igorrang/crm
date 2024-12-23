import { Box } from 'lucide-react';
import {Formik,Form} from 'formik'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import { Divider } from '../Divider/divider'
import {useState} from 'react'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/router'
import {toast} from 'react-hot-toast'
import {loginSchema} from '@/app/Schemas/LoginSchema'
import Email from 'next-auth/providers/email';
import { Input } from '@/components/input/input';
import { Button } from '@/components/Button';

type LoginFormProps ={
    register?: any;
    forgotPassword?: any;
}

export const LoginForm = ({ register, forgotPassword}: LoginFormProps)=>{
    const [showPasswor,setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const loginWithGoogle = async (credentialsResponse: any) => {
        setIsLoading(true)
        const result = await signIn('credentials', {
            redirect: false,
            ...credentialsResponse,
            provider: 'GOOGLE_AUTH'
        })

        if (result?.error){
            toast.error('erro na autenticacao com o google')
            return
        }

        setIsLoading(false)
        router.replace('/Home')
    }

    const handleSubmit = async (values: {email:string; password:string}) => {
        const result = await signIn('credentials', {
            redirect: false,
            credentials: values.email,
            password: values.password,
            provider: 'EMAIL_PASSWORD'
        })

        if (result?.error){
            toast.error(result.error)
            return
        }
    };


    return (
        <>
        <Box className='w-[610]'>
         <h1 className='text-3xl'> entre na sua conta </h1>   
          <Formik initialValues={{
            email:'',
            password: ''

          }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}>
            {({ setFieldValue, values}:any) =>(
               <Form className=' flex flex-col gap-6 mt-8 mb-[35px]'>
                <Input
                type='text'
                placeholder='Email ou cpf'
                onChange={(e) => setFieldValue('email', e.target.value)}
                name='email'
                id ='email' 
                />


                <Input
                 placeholder='Senhas*'
                 onChange={(e) => setFieldValue('password', e.target.value)}
                 name="password"
                 id="password"
                 type={showPasswor? 'text' : 'password'}
                 icon={showPasswor? AiOutlineEyeInvisible : AiOutlineEye}
                 onClickIcon={() => setShowPassword(!showPasswor)}
                 className='flex-row-reverse pr-4'   
                />

                <Button variant="primary"
                className='self-center mt-11 text-xl w-[270] h-[56]'
                 type='submit'>
                    Entrar
                </Button>

                <Button
                className='mt-7 underline hover:opacity-50 w-fit self-center'
                type='button'
                onClick={() => forgotPassword(true)}
                >
                 Esqueci a minha senha
                </Button>
                
               </Form> 
            )}
          </Formik>  
          <Box className="w-[610px]">
        <div className="flex flex-col gap-4">
          <p className="font-bold text-xl">
            Entre ou cadastre-se com as suas redes <br /> sociais.
          </p>
          <p className="text-brownPrimary text-xl">
            Prefere um login mais rápido da próxima vez? Use <br /> suas redes
            sociais para se cadastrar.
          </p>
        </div>
        <GoogleOAuthProvider
          clientId={process?.env?.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}
        >
          <GoogleLogin
            onSuccess={loginWithGoogle}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
        <Divider className="w-[100%]" />
        <div className="flex flex-col gap-4 mt-4">
          <p className="font-bold text-xl">
            Primeira vez por aqui? Cadastre-se agora!
          </p>
          <p className="text-brownPrimary text-xl">
            Precisamos de poucas informações para criar sua conta .
          </p>
        </div>
        <Button
          variant="primary"
          className="self-center mt-8 text-xl w-[270px] h-[56px]"
          onClick={() => register(true)}
        >
          Criar conta
        </Button>
      </Box>
        </Box> 


        
        </>
    )
}