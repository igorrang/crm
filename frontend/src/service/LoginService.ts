import {UserService}from '@/service/UserService' 
import {LoginDto} from '@/types/next-auth'
import {loginByEmailPasswordType, LoginType} from '@/app/utils/credentials'
import { pbkdf2Sync, randomBytes } from 'crypto';


const verifyUser = async (credential: string, password: string ) => {
    console.log("📌 Buscando usuário com:", credential);
    
    let user;
    if (loginByEmailPasswordType(credential) === LoginType.EMAIL) {
        user = await UserService.findByEmail(credential);
    } else if (loginByEmailPasswordType(credential) === LoginType.CPF) {
        user = await UserService.findByCpf(credential);
    } else {
        console.error("❌ Tipo de credencial inválido.");
        return null;
    }

    if (!user) {
        console.error("❌ Usuário não encontrado!");
        return null;
    }

    console.log("✅ Usuário encontrado:", user);

    if (!user.credentials || !user.credentials.password || !user.credentials.salt) {
        console.error("❌ Usuário não tem senha ou salt salvo no banco!");
        return null;
    }

    console.log("📌 Comparando senha...");

    const hashedPassword = pbkdf2Sync(password, user.credentials.salt, 1000, 64, 'sha512').toString('hex');

    console.log("🔍 Senha gerada:", hashedPassword);
    console.log("🔍 Senha armazenada:", user.credentials.password);

    if (hashedPassword !== user.credentials.password) {
        console.error("❌ Senha incorreta!");
        return null;
    }

    console.log("✅ Senha correta, usuário autenticado!");
    return user;
};

const login = async (loginDto: LoginDto) => {
    const verifiedUser = await verifyUser(loginDto.credential, loginDto.password)
    
    if(verifiedUser) {
        return verifiedUser
    }
    return null
}

export default {login}