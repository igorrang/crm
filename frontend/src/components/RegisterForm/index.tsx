import { Formik, Form, FormikProps } from 'formik'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Box } from '../Box'
import { useState } from 'react'
import { Input } from '../input/input'
import { Button } from '../Button'
import { CreateUserSchema } from '@/models/CreateUserSchema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaRegSmileBeam } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { insertMaskInCpf } from '@/shared/cpf'
import { insertMaskInPhone } from '@/shared/phone'
import { postData } from '@/service/APIService'
import toast from 'react-hot-toast'
import { BsArrowLeft } from 'react-icons/bs'
import { Checkbox, Modal } from '@mui/material'
import { Divider } from '../Divider'
import { DATABASE_ERRORS } from '@/service/utils/Errors'
import {UserService}  from '/Users/igorrangelkonvictus/crm/frontend/src/service/UserService'
import { RegisterFormData } from './types'

const registerValues = {
  name: '',
  surname: '',
  cpf: '',
  phone: '',
  birthdate: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  termsOfService: false
}

// Adicione este estilo para o asterisco
const requiredField = <span className="text-red-500 ml-1">*</span>

export const RegisterForm = ({
  register
}: {
  register: (value: boolean) => void
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [openTermsOfServiceModal, setOpenTermsOfServiceModal] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [cpfError, setCpfError] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const verificarEmailExistente = async (email: string) => {
    try {
      const response = await postData({ email }, '/api/user/verify-email')
      if (response?.exists) {
        setEmailError('Este e-mail já está cadastrado')
        return true
      }
      setEmailError('')
      return false
    } catch (error) {
      console.error('Erro ao verificar email:', error)
      return false
    }
  }

  const verificarTelefoneExistente = async (phone: string) => { 
    try {
      const response = await postData({ phone }, '/api/user/verify-phone')
      if (response?.exists) {
        setPhoneError('Este telefone já está cadastrado')
        return true
      }
      setPhoneError('')
      return false
    } catch (error) {
      console.error('Erro ao verificar telefone:', error)
      return false
    }
  }

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const response = await UserService.register(data);
      
      // Adicione logs para debug
      console.log('Resposta do registro:', response);
      
      if (response) {
        toast.success('Cadastro realizado com sucesso!');
        router.push('/login');
      }
    } catch (error: any) {
      console.error('Erro no registro:', error);
      toast.error(error.message || 'Erro ao realizar cadastro');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Box className="w-[1060px] max-h-fit">
        <div className="flex gap-3 items-center">
          <Button onClick={() => register(false)}>
            <BsArrowLeft size={24} />
          </Button>
          <h1 className="text-3xl font-bold mb-1">
            Crie sua conta no seu  crm
          </h1>
        </div>
        <Formik
          initialValues={registerValues}
          onSubmit={handleSubmit}
          validationSchema={CreateUserSchema}
        >
          {({ setFieldValue, values, errors, touched }: FormikProps<any>) => (
            <Form className="flex flex-col gap-3 items-center">
              <div className="flex gap-7 w-full">
                <div className="flex flex-col w-full">
                  <label className="text-sm mb-1">
                    Nome {requiredField}
                  </label>
                  <Input
                    type="text"
                    placeholder="Digite seu nome"
                    onChange={e => setFieldValue('name', e.target.value)}
                    name="name"
                    id="name"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm mb-1">
                    Sobrenome {requiredField}
                  </label>
                  <Input
                    type="text"
                    placeholder="Digite seu sobrenome"
                    onChange={e => setFieldValue('surname', e.target.value)}
                    name="surname"
                    id="surname"
                  />
                </div>
              </div>
              <div className="flex gap-7 w-full">
                <div className="flex flex-col w-full">
                  <label className="text-sm mb-1">
                    CPF {requiredField}
                  </label>
                  <Input
                    type="text"
                    placeholder="000.000.000-00"
                    onChange={(e) => {
                      const apenasNumeros = e.target.value.replace(/[^0-9]/g, '')
                      const cpfComMascara = insertMaskInCpf(apenasNumeros)
                      setFieldValue('cpf', cpfComMascara)
                      setCpfError('')
                    }}
                    value={values.cpf}
                    name="cpf"
                    id="cpf"
                    maxLength={14}
                  />
                  {cpfError && (
                    <span className="text-xs text-red-500 mt-1 ml-2">
                      {cpfError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm mb-1">
                    Telefone {requiredField}
                  </label>
                  <Input
                    type="text"
                    placeholder="(00) 00000-0000"
                    name="phone"
                    id="phone"
                    onChange={e => {
                      const apenasNumeros = e.target.value.replace(/[^0-9]/g, '')
                      const telefoneComMascara = insertMaskInPhone(apenasNumeros)
                      setFieldValue('phone', telefoneComMascara, false)
                      setPhoneError('')
                      if (telefoneComMascara.length === 15) {
                        verificarTelefoneExistente(telefoneComMascara)
                      }
                    }}
                    maxLength={15}
                  />
                  {phoneError && (
                    <span className="text-xs text-red-500 mt-1 ml-2">
                      {phoneError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm mb-1">
                    Data de Nascimento {requiredField}
                  </label>
                  <Input
                    type="date"
                    placeholder="DD/MM/AAAA"
                    onChange={e => setFieldValue('birthdate', e.target.value)}
                    name="birthdate"
                    id="birthdate"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <Input
                  type="email"
                  placeholder="Email*"
                  onChange={async (e) => {
                    const email = e.target.value
                    setFieldValue('email', email)
                    setEmailError('')
                    if (email.includes('@')) {
                      await verificarEmailExistente(email)
                    }
                  }}
                  name="email"
                  id="email"
                />
                {emailError && (
                  <span className="text-xs text-red-500 mt-1 ml-2">
                    {emailError}
                  </span>
                )}
              </div>
              <Input
                type="email"
                placeholder="Confirmar E-mail*"
                onChange={e => setFieldValue('confirmEmail', e.target.value)}
                name="confirmEmail"
                id="confirmEmail"
              />
              <div className="flex flex-col w-full gap-1">
                <Input
                  placeholder="Senha*"
                  onChange={e => setFieldValue('password', e.target.value)}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  icon={showPassword ? AiOutlineEyeInvisible : AiOutlineEye}
                  onClickIcon={() => setShowPassword(!showPassword)}
                  className="flex-row-reverse pr-4"
                />
                <p className="text-xs ml-2">Mínimo 8 caracteres</p>
                <Input
                  placeholder="Senha*"
                  onChange={e =>
                    setFieldValue('confirmPassword', e.target.value)
                  }
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  icon={
                    showConfirmPassword ? AiOutlineEyeInvisible : AiOutlineEye
                  }
                  onClickIcon={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="flex-row-reverse pr-4"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2 w-full items-center">
                  <Checkbox
                    name="termsOfService"
                    id="termsOfService"
                    onChange={e => {
                      setFieldValue('termsOfService', e.target.checked)
                    }}
                    checked={values.termsOfService}
                  />
                  <p
                    onClick={() => setOpenTermsOfServiceModal(true)}
                    className="cursor-pointer hover:opacity-50"
                  >
                    Termos de Serviço
                  </p>
                </div>
                {errors.termsOfService && touched.termsOfService && (
                  <span className="text-xs text-red-300">
                    Termos de Serviço deve ser aceito
                  </span>
                )}
              </div>

              {openTermsOfServiceModal && (
                <Modal
                  open={openTermsOfServiceModal}
                  onClose={() => setOpenTermsOfServiceModal(false)}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[666px] h-fit bg-white shadow-24 p-12 rounded-[20px]">
                    <div className="flex items-center mb-4 justify-between">
                      <h1 className="text-3xl font-bold">Termos de Serviço</h1>
                      <Button
                        type="button"
                        onClick={() => setOpenTermsOfServiceModal(false)}
                      >
                        <AiOutlineClose size={30} color="gray" />
                      </Button>
                    </div>
                    <Divider className="mb-10" />
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sapiente aliquid quam sit architecto quidem animi illum
                      laboriosam quis incidunt voluptate perspiciatis vitae
                      itaque fugiat, officiis dolorem, nam asperiores numquam
                      laborum!
                    </p>
                    <div className="w-full mt-10 flex items-center justify-center">
                      <Button
                        type="button"
                        variant="primary"
                        className="w-[270px] h-[56px]"
                        onClick={() => {
                          setFieldValue('termsOfService', true)
                          setOpenTermsOfServiceModal(false)
                        }}
                      >
                        Aceitar Termos
                      </Button>
                    </div>
                  </div>
                </Modal>
              )}

              <Button
                type="submit"
                variant="primary"
                className="text-xl w-[270px] h-[56px]"
                disabled={isLoading}
              >
                Criar Conta
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}
