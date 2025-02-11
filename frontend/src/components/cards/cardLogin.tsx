'use client'; // Garante que o componente seja renderizado no cliente
import { Formik, Form } from 'formik';
import { Input } from '../input/input';
import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation'; // Use 'next/navigation' para Next.js 13+ Client Components
import React from 'react';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Box } from 'lucide-react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Divider } from '../Divider';
import { loginSchema } from '../../app/schemas/LoginSchema';

type LoginFormProps = {
  register?: any;
  forgotPassword?: any;

}

export const CardLogin = ({register, forgotPassword}: LoginFormProps) => {
  //Component que renderiza paginas no next
  
  // informações inseridas pelo usuario
  const [email, setEmail] = useState(false); //Email inserido pelo usuario
  const [senha, setSenha] = useState(false);//Senha nserido pelo usuario
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Mensagem de erro caso os dados nao coincidam
  const [mensagemErro, setMensagemErro] = useState(false);

  const loginWithGoogle = async (credentialsResponse: any) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      ...credentialsResponse,
      provider: 'GOOGLE_AUTH'
    })

    if (result?.error){
      toast.error('erro na autenticacao com o google')
      return
    }
    setIsLoading(false);
    router.replace('/Home');
  }
  // Envia o formulario com os dados inseridos e encontra um usuario no banco de dados.
  const handleSubmit = async (values:{email: string; password:string}) =>{
    const result= await signIn('credentials',{
      redirect: false,
      credentials: values.email,
      password: values.password,
      provider: 'EMAIL_PASSWORD'

    })

    if (result?.error){
      toast.error(result.error)
      return;
    }
    router.replace('/Home');
  }


  return (
    <>
    <Box className="w-[610px]">
      <h1 className="text-3xl">Entre na sua conta</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ setFieldValue, values }: any) => (
          <Form className="flex flex-col gap-6 mt-8 mb-[35px]">
            <Input
              type="text"
              placeholder="Email ou CPF*"
              onChange={(e) => setFieldValue('email', e.target.value)}
              name="email"
              id="email"
            />

            <Input
              placeholder="Senha*"
              onChange={(e) => setFieldValue('password', e.target.value)}
              id="password"
              name="password"
              type={senha ? 'text' : 'password'}
              icon={senha ? AiOutlineEyeInvisible : AiOutlineEye}
              onClickIcon={() => setSenha(!senha)}
              className="flex-row-reverse pr-4"
            />

            <Button
              variant= "default"
              className="self-center mt-11 text-xl w-[270px] h-[56px]"
              type="submit"
            >
              Entrar
            </Button>

            <Button
              className="mt-7 underline hover:opacity-50 w-fit self-center"
              type="button"
              onClick={() => forgotPassword(true)}
            >
              Esqueci minha senha.
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
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
      <Button
        variant="default"
        className="self-center mt-8 text-xl w-[270px] h-[56px]"
        onClick={() => register(true)}
      >
        Criar conta
      </Button>
    </Box>
  </>
  )
}