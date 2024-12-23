import {Formik, Form, FormikProps} from 'formik'
import{AiOutLineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import {Box} from '../Box'
import {useState} from 'react'
import {Input} from '../input/input'
import {Button} from '../ui/button'
import {CreateUserSchema} from '/Users/igorrangelkonvictus/crm/frontend/src/app/Schemas/CreateUserDeleteSchema'
import { useRouter } from 'next/navigation'
import { AiOutlineClose } from 'react-icons/ai'
import  {insertMaskInCpf} from '@/shared/cpf'
import { insertMaskInPhone } from '@/shared/phone'
import {postData} from '@/shared/APIService'
import toast from 'react-hot-toast'
import {Checkbox, Modal} from '@mui/icons-material'
import {Divider} from '@/components/Divider/divider'

const registerValues = {
  name: '',
  surname:'',
  cpf:'',
  phone:'',
  birthdate:'',
  email:'',
  confirmEmail:'',
  password:'',
  confirmPassword:'',
  termsOfService: false
}


export const RegisterForm = ({
    register
}: {
    register: (value: boolean) => void
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const []
}