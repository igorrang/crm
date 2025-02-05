import { NextResponse } from 'next/server'
import User from '@/models/User'
import { connectMongoDB } from '@/service/lib/mongodb'
import UserService from '@/service/UserService'
import { LoginDto } from '@/models/types/next-auth'
import { loginByEmailPasswordType, LoginType } from '@/app/utils/credentials'

export async function GET(request: Request) {
    try {
        await connectMongoDB()
        const { searchParams } = new URL(request.url)
        
        // Pegar parâmetros da query
        const email = searchParams.get('email')
        const cpf = searchParams.get('cpf')
        const name = searchParams.get('name')

        // Construir query
        let query: any = {}
        
        if (email) query.email = { $regex: email, $options: 'i' }
        if (cpf) query.cpf = { $regex: cpf, $options: 'i' }
        if (name) query.name = { $regex: name, $options: 'i' }

        // Executar busca
        const users = await User.find(query)
            .select('-password -salt') // Excluir campos sensíveis
            .limit(10)

        return NextResponse.json({ 
            success: true,
            data: users
        })

    } catch (error: any) {
        console.error('Erro na busca:', error)
        return NextResponse.json({ 
            error: 'Erro ao buscar usuários'
        }, { 
            status: 400 
        })
    }
}

const verifyUser = async (credential: string, password: string) => {
    let user;
    if (loginByEmailPasswordType(credential) === LoginType.EMAIL) {
        user = await UserService.findByEmail(credential)
    } else if (loginByEmailPasswordType(credential) === LoginType.CPF) {
        user = await UserService.findByCpf(credential)
    } else {
        throw new Error('Invalid credential type')
    }

    if (!user || !user.credentials?.password || !user.credentials?.salt) {
        return null
    }

    const hashedPassword = await UserService.hashPassword(
        password,
        user.credentials.salt
    ) 

    if (hashedPassword === user.credentials.password) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified
        }
    }

    return null
}

const login = async (loginDto: LoginDto) => {
    return await verifyUser(loginDto.credential, loginDto.password)
}

export default { login } 