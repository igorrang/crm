import * as  yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Campo obrigatório')
    .transform((value) =>{
        const nonSpecialChars = value.replace(/[-.]/g,'');
        const isPotentialCpf =  /ˆ\d{11}$/.test(value)
        //return isEmail || isCpf
        return  isPotentialCpf ? nonSpecialChars : value
    })
    .test(
        'is valid',
        'Digite um email válido ou um CPF com 11 caracteres',
        (value) => {
            if(value.includes('@')){
                return true
            }
            return value.length === 11
        }


    ),
    password: yup.string().min(8,'a senha deve ter ao menos 8 caracteres').required('Campo obrigatório')
})