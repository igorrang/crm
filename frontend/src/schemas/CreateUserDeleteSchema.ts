
import * as yup from 'yup'

export const CreateUserDeleteSchema = yup.object().shape({
    reason: yup.string().required('A razão é obrigatório'),
    confirmEmail: yup.string().required('O email de confirmação ')
})