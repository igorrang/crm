// auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Implemente a lógica de verificação de credenciais aqui
        // Retorne o usuário se as credenciais forem válidas
        return null;
      },
    }),
    // Outros provedores podem ser adicionados aqui
  ],
  pages: {
    signIn: '/login', // Página de login personalizada
  },
};