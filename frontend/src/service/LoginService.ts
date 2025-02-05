/* eslint-disable import/no-anonymous-default-export */
import UserService from './UserService'
import { LoginDto } from '@/models/types/next-auth'
import { loginByEmailPasswordType, LoginType } from '@/app/utils/credentials'

interface VerifiedUser {
    _id: string;
    name: string;
    email: string;
    emailVerified: boolean;
}

const verifyUser = async (credential: string, password: string): Promise<VerifiedUser | null> => {
    console.log('Verifying user with credential:', credential);

    // Validação do formato da credencial
    const credentialType = loginByEmailPasswordType(credential);
    if (credentialType !== LoginType.EMAIL && credentialType !== LoginType.CPF) {
        console.error('Invalid credential format');
        return null;
    }

    let user;
    if (credentialType === LoginType.EMAIL) {
        user = await UserService.findByEmail(credential);
    } else if (credentialType === LoginType.CPF) {
        user = await UserService.findByCpf(credential);
    }

    if (!user || !user.credentials?.password || !user.credentials?.salt) {
        console.log('User or credentials not found');
        return null;
    }

    const hashedPassword = await UserService.hashPassword(
        password,
        user.credentials.salt
    );

    if (hashedPassword === user.credentials.password) {
        console.log('Password match for user:', user.email);
        return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified
        };
    }

    console.log('Password mismatch');
    return null;
}

const login = async (loginDto: LoginDto): Promise<VerifiedUser | null> => {
    return await verifyUser(loginDto.credential, loginDto.password);
}

export default { login }
