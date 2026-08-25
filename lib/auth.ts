

import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import db from "../prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultSession } from "next-auth";
import type { AdapterUser } from "@auth/core/adapters";
import { SignInSchema } from "@/lib/validations";

declare module "next-auth" {
  interface User {
    role?: string;
    businessId?: number | null;
  }

  interface Session {
    user: {
      id: string;
      role?: string;
      businessId?: number | null;
    } & DefaultSession["user"];
  }
}
// JWT types need to be in @auth/core/jwt for NextAuth v5
declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    businessId?: number | null;
  }
}

// You do not have to change your default schema unless you want to support email verification or user images.
// NextAuth's PrismaAdapter expects fields like emailVerified and image because the default schema includes them.
// If your schema does not have these fields, you can safely omit them from the returned object as you did.
// However, you may see TypeScript warnings or errors because of type mismatches.
// To resolve this, you can cast the returned object to the expected AdapterUser type, or extend your schema to include those fields as nullable if you want full compatibility.

const adapter = PrismaAdapter(db);

adapter.createUser = async (data) => {
  // Remove id if present
  const { id } = data;

  // Create user with default role
  const user = await db.user.create({
    data: {
      name: data.name ?? data.email ?? "User",
      email: data.email,
      role: "RETAILER", // or your default
    },
  });

  // Return AdapterUser shape, omitting fields not in your schema
  return {
    id: user.id.toString(), // NextAuth expects string id
    name: user.name,
    email: user.email,
    emailVerified: null, // explicitly set to null if not in schema
    image: null,         // explicitly set to null if not in schema
  } as AdapterUser;
};

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
        const parsed = SignInSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        if (!user.password) return null;
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          businessId: user.businessId,
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
      token.businessId = user.businessId ?? null;
    }
    return token;
  },
  async session({ session, token }) {
    if (token) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role= token.role as string;
      session.user.businessId = token.businessId ?? null;
    }
    return session;
  }},
  secret: process.env.NEXTAUTH_SECRET,
});
