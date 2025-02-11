import NextAuth from 'next-auth'

import { nextAuthOption} from '/Users/igorrangelkonvictus/crm/frontend/src/service/utils/AuthOptions'

const handler = NextAuth(nextAuthOption)

export {handler as GET, handler as POST }
