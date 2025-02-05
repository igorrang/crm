import '/Users/igorrangelkonvictus/crm/frontend/src/app/globals.css'
import type {Metadata} from 'next'
import {DM_Sans} from 'next/font/google'
import {getServerSession} from 'next-auth'
import {redirect} from 'next/navigation'
import {Toaster} from 'react-hot-toast'
import { nextAuthOptions } from '../../service/utils/AuthOptions'
import { AuthProvider } from '@/providers/SessionProvider'

const DMSans = DM_Sans({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Login - crm',
    description: 'Página de Login -Crm Konvictus'
}

export default async function LoginAreaLayout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(nextAuthOptions)
    if (session) {
        redirect('/Planilha')
    }

    return (
        <html lang="pt-br">
            <body
            className={`${DMSans.className} flex flex-col h-screen w-screen`}
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}