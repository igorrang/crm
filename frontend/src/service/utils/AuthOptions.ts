import { NextAuthOptions } from 'next-auth'
import LoginService from '@LoginService/'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { CreateUserDtoFromGoogle, UserProvider } from '@/models/types/userTypes'
import { OAuth2Client } from 'google-auth-library'
import UserService from '../UserService'

interface NextAuthSessionProviderProps {
  children: ReactNode
}

export default function NextAuthSessionProvider({
  children
}: NextAuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
