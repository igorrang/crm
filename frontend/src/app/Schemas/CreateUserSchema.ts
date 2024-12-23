import { cpf } from 'cpf-cnpj-validator'
import * as yup from 'yup'

export const CreateUserSchema = yup.object().shape({
    name: yup.string().required('o nome é obrigatório'),
    surname: yup.string().required('O sobrenome é obrigatório'),
    cpf: yup
    .string()
    .transform((value, originalValue) => {
        if (originalValue) {
            return originalValue.replace(/[-.]/g,'')
        }
        return value
    })
    .required('o cpf é obrigatório')
    .test('cpf-valido','O CPF é inválido', value => cpf.isValid(value))
    .min(11,'O CPF deve ter 11 caracters')
    .max(11,'O CPF deve ter 11 caracters'),
    phone: yup
    .string()
    .transform((value, originalValue)=>{
        if (originalValue) {
            return originalValue.replace(/\D/g, '')
        }
        return value
    })
    .required('O celular')
    .test('is-numeric','O celular deve conter apenas números', value => {return /^\d+$/.test(value)})
    .min(10,'O celular deve ter no minímo 10 digitos')
    .max(11,'O celular deve ter no maximo 11 digitos'),

    email: yup
        .string()
        .email('Email inválido')
        .required('O email é obrigatório'),
    
        password: yup 
        .string()
        .min(8,'a senha deve ter 8 caracteres')
        .matches(   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'A senha deve ter pelo menos um caractere especial e um número')
        .required('A senha é obrigatória'),

        confirmEmail: yup 
         .string()
         .nullable()
         .oneOf(
            [yup.ref('password')],
            'As senhas devem ser iguais'
         )
         .required('a senha de confirmação é obrigatória'),
         birthdate:yup.date().required('A data de nascimento é obrigatória'),
         termsOfService: yup 
            .boolean()
            .oneOf([true], 'Voce precisa aceitar os termos de uso ')
})