import * as yup from 'yup'
import { cpf } from 'cpf-cnpj-validator';

export const CreateUserSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  surname: yup.string().required('O sobrenome é obrigatório'),
  cpf: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue) {
        return originalValue.replace(/[-.]/g, '')
      }
      return value
    })
    .required('O CPF é obrigatório')
    .test('cpf-valido', 'O CPF é inválido', value => cpf.isValid(value))
    .min(11, 'O CPF deve ter 11 caracteres')
    .max(11, 'O CPF deve ter 11 caracteres'),
  phone: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue) {
        return originalValue.replace(/\D/g, '')
      }
      return value
    })
    .required('O celular é obrigatório')
    .test('is-numeric', 'O celular deve conter apenas números', value => {
      return /^\d+$/.test(value)
    })
    .min(10, 'O celular deve ter no mínimo 10 dígitos')
    .max(11, 'O celular deve ter no máximo 11 dígitos'),

  email: yup
    .string()
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'A senha deve ter pelo menos um caractere especial e um número'
    )
    .required('A senha é obrigatória'),
  confirmEmail: yup
    .string()
    .nullable()
    .oneOf([yup.ref('email')], 'O email de confirmação deve ser igual ao email')
    .required('O email de confirmação é obrigatório'),
  confirmPassword: yup
    .string()
    .nullable()
    .oneOf(
      [yup.ref('password')],
      'A senha de confirmação deve ser igual à senha'
    )
    .required('A senha de confirmação é obrigatória'),
  birthdate: yup.date().required('A data de nascimento é obrigatória'),
  termsOfService: yup
    .boolean()
    .oneOf([true], 'Você precisa aceitar os termos de uso.')
})
