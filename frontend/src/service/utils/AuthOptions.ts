import { NextAuthOptions } from 'next-auth'
import LoginService from '/Users/igorrangelkonvictus/crm/frontend/src/service/LoginService'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { CreateUserDtoFromGoogle, UserProvider } from '@/models/types/userTypes'
import { OAuth2Client } from 'google-auth-library'
import { UserService } from '../UserService'

export const nextAuthOption: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },

    providers: [
        GoogleProvider({clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                provider: {label: 'provider', type: 'text'},
                email: {label:'email', type:'text'},
                password:{label:'password', type:'password'}
            },

            async authorize(credentials:any , req:any) {
                console.log('credentials', credentials) 
                let user
                if (credentials.provider === UserProvider.EMAIL_PASSWORD) {
                    console.log("📌 Tentando autenticar usuário...")
                    user = await LoginService.login({
                        credential: credentials.credential,
                        password: credentials.password
                    })
                    console.log("📌 Resultado da autenticação:", user)
                } else {
                    try{

                        const client = new OAuth2Client()
                        const ticket = await client.verifyIdToken ({
                            idToken: credentials.credential,
                            audience: credentials.client_id,
                        })

                        const  payload = ticket.getPayload()

                        user = await UserService.findByEmail(payload?.email as string)

                        if(!user){
                            const createUserDtoFromGoogle: CreateUserDtoFromGoogle = {
                                name: payload?.given_name as string, surname: payload?.family_name as string, email: payload?.email as string, confirmEmail: payload?.email as string, provider: UserProvider.GOOGLE_AUTH,
                              
                            }
                        
                            try {
                                const createdUserFromGoogle = await UserService.createUserFromGoogle(createUserDtoFromGoogle)
                                if(!createdUserFromGoogle) {
                                    return null
                                }
                                user = createdUserFromGoogle
                            } catch (error){
                                console.log(error)
                                return null
                            }
                        }
                    } catch(e) {
                        return null
                    }
                }
                if (!user) {
                    console.error('❌ Usuário não autenticado - Retornando null.');
                    return null;
                }
                
                console.log('✅ Usuário autenticado:', user);
                
                return {
                    id: user._id.toString(),  // Converter ObjectId para string
                    name: user.name,
                    email: user.email
                };
        }

        })
    ],
    callbacks: {
        async session ({session, token}) {
            session.user.id = token.sub ? token.sub : ''
            return session
        }
    },
    pages: {
        signIn: '/login'
    },
    jwt: {
        maxAge: 7200
    }
}