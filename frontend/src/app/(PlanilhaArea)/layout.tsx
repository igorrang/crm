import '/Users/igorrangelkonvictus/crm/frontend/src/app/globals.css'
import type {Metadata} from 'next'
import {DM_Sans} from 'next/font/google'
import NextAuthSessionProvider from '@/models/providers/sessionProvider'
import {getServerSession} from 'next-auth'
import {redirect} from 'next/navigation'
import {Toaster} from 'react-hot-toast'
import { nextAuthOption } from '@/service/utils/AuthOptions'

const DMSans = DM_Sans({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Planilha - crm',
    description: 'Planilha -Crm Konvictus'
}

export default async function PlanilhaAreaLayout({
    
    children
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(nextAuthOption)
    if (session) {
   
    }

    return (
        <html lang="pt-br">
            <body
            className={`${DMSans.className} flex flex-col h-screen w-screen`}
            >
                <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
            </body>
        </html>
    )
}
