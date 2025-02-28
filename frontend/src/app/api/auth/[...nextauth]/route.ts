import NextAuth from 'next-auth'

import { nextAuthOption} from '@/service/utils/AuthOptions'

const handler = NextAuth(nextAuthOption)

export {handler as GET, handler as POST }
