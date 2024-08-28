import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { compare } from "bcrypt";
import { db } from "./db.prisma";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/account/signin",
    error: "/account/error",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const accountAlReadyExsist = await db.account.findUnique({
          where: { email: credentials?.email },
        });

        // check account already exsist
        if (!accountAlReadyExsist) {
          throw new Error("User is not registered");
        }

        // password check
        const passwordMatch = await compare(
          credentials?.password,
          accountAlReadyExsist?.password
        );

        if (!passwordMatch) {
          throw new Error("Wrong password");
        }

        // find user
        const findUser = await db.user.findUnique({
          where: { accountId: accountAlReadyExsist.id },
        });

        return {
          id: findUser?.id,
          name: findUser?.name,
          email: findUser?.email,
          image: findUser?.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          name: user.name,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: token.name,
        },
      };
    },
  },
};

export default authOptions;
