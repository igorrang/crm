import { NextAuthOptions } from 'next-auth'
import LoginService from '@LoginService/'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { CreateUserDtoFromGoogle, UserProvider } from '@/models/types/userTypes'
import { OAuth2Client } from 'google-auth-library'
import UserService from '../UserService'

export const nextAuthOption: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name:'credentials',
            credentials: {
                provider:{label: 'provider', type:'text'},
                email:{label:'email',type:'text'},
                password:{label:'password', type:'passord'}
            },
            async authorize (credentials:any, req:any) {
                let user;
                if (credentials.provider === UserProvider.EMAIL_PASSWORD){
                    user = await LoginService.login({credential:credentials.credential,
                        password: credentials.password
                    })
                }else{
                    try{
                        const client = new OAuth2Client()
                        const ticket = await client.verifyIdToken({
                            idToken: credentials.credential,
                            audience: credentials.client_id,
                        })
                        
                        const payload = ticket.getPayload()

                        user = await UserService.findByEmail(payload?.email as string)
                        
                        if(!user) {
                            const createUserDtoFromGoogle : CreateUserDtoFromGoogle = {name: payload?.given_name as string, surname: payload?.family_name as string, confirmEmail:payload?.email as string, provider:UserProvider.GOOGLE_AUTH}
                        }

                        try {
                            const createdUserFromGoogle = await UserService.createUserFromGoogle(createUserDtoFromGoogle)

                            if (!createdUserFromGoogle){
                                return null
                            }
                            user = createdUserFromGoogle
                        } catch (error){
                            console.log(error)
                            return null
                        }
                    }
                 catch(e) {
                  return null
                }
            
            }
            if (user) {
                console.log('authenticated')
                return{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                } 
            }
            console.log('auth faield')
            return null    
            }
        })
    ],
     callbacks: {
        async session({ session, token}) {
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
