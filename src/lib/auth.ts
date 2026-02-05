import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.phone = (user as any).phone;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.phone = token.phone;
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        const login = (credentials.login as string).trim();
        
        const user = await prisma.user.findFirst({
          where: { 
            OR: [
              { phone: login }, 
              { email: login.includes("@") ? login : undefined } 
            ] 
          },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password as string, user.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          phone: user.phone,
          role: user.role,
          name: user.username || user.phone,
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
});