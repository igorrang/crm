import { Formik, Form } from 'formik';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { BiLogoGoogle } from 'react-icons/bi';
import { Box } from '../Box';
import { Divider } from '../Divider/divider';
import { useState } from 'react';
import { Input } from '../input/input';
import { Button } from '../Button';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/app/schemas/LoginSchema';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
type LoginFormProps = {
  register?: any;
  forgotPassword?: any;
};
export const LoginForm = ({ register, forgotPassword }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginWithGoogle = async (credentialResponse: any) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      ...credentialResponse,
      provider: 'GOOGLE_AUTH',
    });

    if (result?.error) {
      toast.error('Erro na autenticação com Google');
      return;
    }
    
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    const result = await signIn('credentials', {
      redirect: false,
      credential: values.email,
      password: values.password,
      provider: 'EMAIL_PASSWORD',
    });

    if (result?.error) {
      toast.error(result.error);
      return;
    }
    router.replace('/planilha');
  };

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
                type={showPassword ? 'text' : 'password'}
                icon={showPassword ? AiOutlineEyeInvisible : AiOutlineEye}
                onClickIcon={() => setShowPassword(!showPassword)}
                className="flex-row-reverse pr-4"
              />

              <Button
                variant="primary"
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
    </>
  );
};
