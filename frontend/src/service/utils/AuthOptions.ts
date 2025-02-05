import { NextAuthOptions } from 'next-auth'
import LoginService from '../LoginService'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { CreateUserDtoFromGoogle, UserProvider } from '@/models/types/userTypes'
import { OAuth2Client } from 'google-auth-library'
import UserService from '../UserService'

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        credential: { label: 'Email ou CPF', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Authorize called with:', credentials);
        try {
          if (!credentials?.credential || !credentials?.password) {
            throw new Error('Credenciais são obrigatórias')
          }

          const user = await LoginService.login({
            credential: credentials.credential,
            password: credentials.password
          })

          if (!user) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name
          }

        } catch (error: any) {
          throw new Error(error.message || 'Erro na autenticação')
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub ? token.sub : ''
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  jwt: {
    maxAge: 7200 // 2 hours
  }
}
