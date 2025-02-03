import { cpf } from 'cpf-cnpj-validator'
import * as yup from 'yup'

export const CreateUserSchema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    surname: yup.string().required('O sobrenome é obrigatório'),
    cpf: yup
        .string()
        .transform((value, originalValue) => {
            if(originalValue) {
                return originalValue.replace(/[-.]/g, '')
            }
            return value 
        })
        .required('O CPF é obrigatório')
        .test('cpf-valido', 'O CPF é inválido', value => cpf.isValid(value))
        .min(11,'O CPF deve ter no mínimo 11 caracteres')
        .max(11,'O CPF deve ter 11 caracteres'),
    phone: yup
        .string()
        .required('O telefone é obrigatório')
        .matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato de telefone inválido')
        .min(15, 'O telefone deve ter 11 dígitos')
        .max(15, 'O telefone deve ter 11 dígitos'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup
        .string()
        .min(8,'A senha deve ter pelo menos 8 caracteres')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'A senha deve ter pelo menos um caractere especial e um número'
        )
        .required('A senha é obrigatória'),
    confirmEmail: yup 
        .string()
        .nullable()
        .oneOf([yup.ref('email'), null], 'Os emails devem ser iguais')
        .required('Campo obrigatório'),
    confirmPassword: yup 
        .string()
        .nullable()
        .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
        .required('A senha de confirmação é obrigatória'),
    birthdate: yup.date().required('A data de nascimento é obrigatória'),
    termsOfService: yup
        .boolean()
        .oneOf([true], 'Você precisa aceitar os termos')
})