import { cpf } from 'cpf-cnpj-validator'
import * as yup from 'yup'

export const CreateUserSchema = yup.object().shape({
    name: yup.string().required('o nome é obrigatório'),
    surname: yup.string().required('O sobrenome é obrigatório '),
    cpf: yup
        .string()
        .transform((value, originalValue) => {
            if(originalValue) {
                return originalValue.replace(/[-.]/g, '')
            }
            return value 
        })

        .required('O cpf é obrigatório')
        .test('cpf-valido', 'O cpf é valido', value => cpf.isValid(value))
        .min(11,'O cpf deve ter no minimo 11 caracteres')
        .max(11,'o cpf deve ter 11 caraters'),
        phone: yup
        .string()
        .transform((value, originalValue)=> {
            if(originalValue){
                return originalValue.replace(/[-()]/g, '')
            }
            return value
        })
        .required('o numero de telefone é obrigatório ')
        .test('is-numeric', 'O celular deve conter apenas números', value => {
            return /ˆ\d+$/.test(value)
        })
        .min(10,'o celular deve ter no minimo 10 digitos')
        .max(11,'o celular deve ter no maximo 11 digitos'),

        email: yup.string().email('Email inválido').required('Campo obrigatório'),

        password: yup
        .string()
        .min(8,'a senha deve ter pelo menos 8 caracteres')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'A senha deve ter pelo menos um caractere especial e um número'
          )
          .required('a senha é obrigatória')
          

})