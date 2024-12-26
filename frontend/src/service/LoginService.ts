import UserService from './UserService' 
import {LoginDto} from '@/types/next-auth'
import {loginByEmailPasswordType, LoginType} from '@/app/utils/credentials'


const verifyUser = async (credential: string, password: string ) => {
    let user  
    if(loginByEmailPasswordType(credential)=== LoginType.EMAIL){
        user = await UserService.findByEmail(credential)
    } else if (loginByEmailPasswordType(credential)=== LoginType.CPF) {
        user = await UserService.findByCpf(credential)
    }else {
        throw new Error('Invalid credential ')
    }

    if (user && user.credentials.password){
        const hashedPassword = await UserService.hashPassword(
            password,
            user.credentials.salt
        )
        if(hashedPassword === user.credentials.password) {
            return user
        }
    }

    return null
}

const login = async (loginDto: LoginDto) => {
    const verifiedUser = await verifyUser(loginDto.credential, loginDto.password)
    if(verifiedUser) {
        return verifiedUser
    }
    return null
}

export default {login}