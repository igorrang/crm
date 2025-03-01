import { Formik, Form, FormikProps } from 'formik'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { Box } from '../Box'
import { useState } from 'react'
import { Input } from '@/components/input'
import { Button } from '../Button'
import { CreateUserSchema } from '@/models/CreateUserSchema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaRegSmileBeam } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { insertMaskInCpf } from '@/shared/cpf'
import { insertMaskInPhone } from '@/shared/phone'
import { postData } from '@/service/FrontEnd/APIService'
import toast from 'react-hot-toast'
import { BsArrowLeft } from 'react-icons/bs'
import { Checkbox, Modal } from '@mui/material'
import { Divider } from '../Divider'

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
  
  export const RegisterForm = ({
    register
  }: {
    register: (value: boolean) => void
  }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [openTermsOfServiceModal, setOpenTermsOfServiceModal] = useState(false)
    const router = useRouter()
  
    const handleSubmit = async (values: any) => {
      try {
        const data = {
          name: values.name,
          surname: values.surname,
          email: values.email,
          confirmEmail: values.confirmEmail,
          cpf: values.cpf.replace(/[-.]/g, ''),
          phone: values.phone.replace(/\D/g, ''),
          password: values.password,
          birthdate: values.birthdate,
          confirmPassword: values.confirmPassword
        }
  
        const signup = await postData(data, 'user')
        if (signup?.error) {
          toast.error(signup?.error)
        }
  
        // Usuário fará login automaticamente após criar a conta? Caso faça, terá de implementar a validação por dentro do sistema na seção do perfil.
        // Caso tenha o login, não será necessário o link de verificação de e-mail, somente o código.
  
        // const result = await signIn('credentials', {
        //   redirect: false,
        //   credential: values.email,
        //   password: values.password,
        //   provider: 'EMAIL_PASSWORD'
        // })
  
        // if (result?.error) {
        //   console.log(result.error)
        //   return
        // }
        
        register(false)
  
        toast.custom((t: any) => (
          <div
            className={`w-[760px] h-[56px] bg-[#75B798] p-4 flex gap-3 items-center rounded-md justify-center ${
              t.visible ? 'animate-enter' : 'animate-leave'
            }`}
          >
            <FaRegSmileBeam size={24} />
            <p className="text-xl font-[#0A3622]">
              Conta criada com sucesso! Faça a verificação do e-mail para ter
              acesso
            </p>
            <Button onClick={() => toast.dismiss(t.id)}>
              <AiOutlineClose size={24} />
            </Button>
          </div>
        ))
      } catch (error) {
        toast.error('Ocorreu um erro ao criar a conta')
      }
    }
  
    return (
      <>
        <Box className="w-[1060px] max-h-fit">
          <div className="flex gap-3 items-center">
            <Button onClick={() => register(true)}>
              <BsArrowLeft size={24} />
            </Button>
            <h1 className="text-3xl font-bold mb-1">
              Crie sua conta no seu crm 
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
                  <Input
                    type="text"
                    placeholder="Nome*"
                    onChange={e => setFieldValue('name', e.target.value)}
                    name="name"
                    id="name"
                  />
                  <Input
                    type="text"
                    placeholder="Sobrenome*"
                    onChange={e => setFieldValue('surname', e.target.value)}
                    name="surname"
                    id="surname"
                  />
                </div>
                <div className="flex gap-7 w-full">
                  <Input
                    type="text"
                    placeholder="CPF*"
                    onChange={e =>
                      setFieldValue('cpf', insertMaskInCpf(e.target.value))
                    }
                    name="cpf"
                    id="cpf"
                  />
                  <Input
                    type="text"
                    placeholder="(00) 00000-0000"
                    name="phone"
                    id="phone"
                    onChange={e => {
                      setFieldValue('phone', insertMaskInPhone(e.target.value))
                    }}
                  />
                  <Input
                    type="date"
                    placeholder="Data de Nascimento*"
                    onChange={e => setFieldValue('birthdate', e.target.value)}
                    name="birthdate"
                    id="birthdate"
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email*"
                  onChange={e => setFieldValue('email', e.target.value)}
                  name="email"
                  id="email"
                />
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
  