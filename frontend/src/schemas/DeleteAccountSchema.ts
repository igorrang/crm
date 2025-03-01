import * as yup from 'yup'

export const DeleteAccountSchema = yup.object().shape({
    reason: yup.string().required('A razão é obrigatória'),
    confirmEmail: yup
    .string()
    .email('Digite um email valido')
    .required('O email é obrigatório')

})