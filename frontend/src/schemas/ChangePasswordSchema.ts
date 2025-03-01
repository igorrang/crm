import * as yup from 'yup'

export const ChangePasswordSchema = yup.object().shape({
    password: yup
    .string()
    .min(8,'A senha deve ter pelo menos 8 caracters')
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'A senha deve ter pelo menos um caractere especial e um número'
    )
    .required('A senha é obrigatória'),
    confirmPassword: yup 
    .string()
    .nullable()
    .oneOf(
        [yup.ref('password')],
        'As senhas deve ser iguais a senha'
    )
    .required('A senha de confirmação é obrigatória')
})