import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import { Adapter } from "next-auth/adapters"
import Resend from "next-auth/providers/resend"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  
  trustHost: true,
  theme:{
    logo: '/logo.png'
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks:{
    session({session, user}){
      session.user.role = user.role;
      return session;
    }
  },
  providers: [
    Resend({
      from: "ntlal0e182@gmail.com"
    }),
    Google
  ],
})