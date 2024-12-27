import {DefaultSession, DefaultUser} from 'next-auth'
import {DefaultJWT} from 'next-auth/jwt'


declare module 'next-auth' {
    interface User extends DefaultUser {
        id: string
    }
    interface Session extends DefaultSession {
        user: User
    }
}

export interface LoginDto {
    credential: string
    password: string
}