export const isValidEmail = (email:string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export const isValidCpf = (cpf:string): boolean => {
    const cpfRegex = /^\d{11}$/
    return cpfRegex.test(cpf)

}

export enum LoginType {
    EMAIL = 'EMAIL',
    CPF = 'CPF'
}

export const loginByEmailPasswordType = (credential :string) : LoginType => {
    if (isValidEmail(credential)){
        return LoginType.EMAIL
    } else if(isValidCpf(credential)) {
        return LoginType.CPF
    } else {
        throw new  Error ('formato invalido ')
    }
}