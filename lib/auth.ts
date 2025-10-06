

import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import db from "../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}
// JWT types need to be in @auth/core/jwt for NextAuth v5
declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}



  

export  const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Narrow types safely
        if (!credentials?.email || typeof credentials.email !== "string") return null;
        if (!credentials?.password || typeof credentials.password !== "string") return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role:user.role
        } as User;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.name = user.name;
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }) {
    if (token) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role= token.role as string;
    }
    return session;
  }},
  secret: process.env.NEXTAUTH_SECRET,
});
