'use client'
import { Input } from '@/components/input'
import { Button } from '../Button'
import {Form, Formik} from 'formik'
import { Box } from 'lucide-react';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineClose } from 'react-icons/ai'
import { useState
 } from 'react';
import {useRouter} from 'next/navigation'
import {postData} from '@/service/APIService'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { FaRegSmileBeam } from 'react-icons/fa';

const recoveryPasswordForm = yup.object().shape({
    password: yup
    .string()
    .min(8,'A senha deve ter pelo menos 8 caracteres')
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'a senha deve ter pelo menos um caractere especial e um número '
    )
    .required('A senha é obrigatorio'),
    confirmPassword: yup 
    .string()
    .nullable()
    .oneOf(
        [yup.ref('password')],
        'A senha de confirmação deve ser igual à senha'
    )
    .required('A senha de confirmação é obrigatório')
})

export const RecoveryPasswordForm = ({
    queryParams
}: {
    queryParams: {
        code: string
        email: string
    }
}) => {
    const [showPasswor, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (values: {
        password : string
    }) => {
        try {
            await postData(
                {
                    email: queryParams.email,
                    code: queryParams.code,
                    password: values.password
                },
                '/user/recovery-password'
            )
            toast.custom((t:any ) => (
                <div 
                className={`w-[760px] h-[56px] bg-[#758798] p-4 flex gap-3 items-center rounded-md justify-center ${t.visible ? 'animate-enter' : 'animate-leave'}`}
                >
                    <FaRegSmileBeam size={24}/>
                    <p className='text-xl font-[#0A3622]'>
                        Senha alterada com sucesso!
                    </p>
                    <Button onClick={() => toast.dismiss(t.id)}>
                        <AiOutlineClose size={24}/>
                    </Button>
                </div>
            ))

            router.push('/login')
        } catch {
            toast.error('Ocorreu um erro ao alterar a senha')
        }
    }
    return (
        <Box className='w-[612px]'>
            <h1 className='text-3xl'>redefinir senha </h1>
            <Formik 
            initialValues={{
                password: '',
                confirmPassword: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={recoveryPasswordForm}
            >
                {({setFieldValue}: any) => (
                    <Form className='flex flex-col gap-6 mt-8 mb-[35px]'>
                        <Input
                        placeholder='senha*'
                        onChange={e => setFieldValue('password', e.target.value)}
                        id='password'
                        name='password'
                        type={showPasswor ? 'text' : 'password'}
                        icon={showPasswor ? AiOutlineEyeInvisible : AiOutlineEye}
                        onClickIcon={() => setShowPassword(!showPasswor)}
                        className='flex-row-reverse pr-4'
                        />
                        <Input
                        placeholder='senha*'
                        onChange={e => setFieldValue('confirmPassword', e.target.value)}
                        id='confirmPassword'
                        name='confirmPassword'
                        type={showConfirmPassword ? 'text' : 'password'}
                        onClick={()=>  setShowConfirmPassword}
                        className='flex-row-reverse pr-4'
                        />
                        <Button
                        variant='primary'
                        className='self-center mt-11 text-xl w-[270] h-[56]'
                        type='submit'
                        >
                            confirmar
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}