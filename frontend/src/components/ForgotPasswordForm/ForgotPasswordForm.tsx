import {Form,Formik} from 'formik'
import {Box} from '../Box'
import {Button} from '../Button'
import {Input} from '../input/input'
import {postData} from '@/service/FrontEnd/APIService'
import { FaRegSmileBeam } from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import {BsArrowLeft} from 'react-icons/bs'
import * as yup from 'yup'
import toast from 'react-hot-toast'

const forgotPasswordSchema = yup.object().shape({
    email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
})

export const ForgotPasswordForm = ({
    forgotPassword 
} : {
    forgotPassword: (value: boolean) => void
}) => {
    const handleSubmit = async (values: {email: string}) => {
        try{
            await postData({email: values.email}, '/user/forgot-password')
            forgotPassword(false)

            toast.custom((t: any)=>  (
                <div
                className={`w-[760px] h-[56px] bg-[#75B798] p-4 flex gap-3 items-center rounded-md justify-center ${
                  t.visible ? 'animate-enter' : 'animate-leave'
                }`}
              >
              <FaRegSmileBeam/>


                <Button>
                    <AiOutlineClose/>
                </Button>
              </div>
              

            ))
        }catch (error){
            toast.error('ocorreu um erro')
        }
    }

    return(
        <Box className='w-[612]'>
            <div className='text-3xl'>
            <Button onClick={() => forgotPassword(false)}>
                <BsArrowLeft size={24}/>
            </Button>
            <h1 className='text-3xl'> Redefinir Senha</h1>
            </div>
            <Formik
                initialValues={{email:''}}
                onSubmit={handleSubmit}
                validationSchema={forgotPasswordSchema}
            >
                {({setFieldValue}:any)=>(
                    <Form>
                        <Input
                        type='text'
                        placeholder='Email'
                        name='email'
                        id='email'
                        onChange={(e) => setFieldValue('email', e.target.value)}
                        />
                        <Button
                        type='submit'
                        className='self-center mt-11 text-xl w-[270] h-[56]'
                        >
                            Enviar
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )


   }  
 
