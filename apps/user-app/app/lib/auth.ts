import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone Number",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "12323454...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Do zod validation, OTP validation here
        if (!credentials?.phone) return null;
        if (!credentials?.password) return null;

        const SALT = 10;
        const hashedPassword = await bcrypt.hash(credentials.password, SALT);
        const existingUser = await prisma.user.findUnique({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }

          return null;
        }

        // try {
        //   const user = await prisma.user.create({
        //     data: {
        //       number: credentials.phone,
        //       password: hashedPassword,
        //     },
        //   });

        //   return {
        //     id: user.id.toString(),
        //     name: user.name,
        //     email: user.number,
        //   };
        // } catch (e) {
        //   console.error(e);
        // }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }: any) {
      // console.log("token : ", token);
      // console.log("session : ", session);
      session.user.id = token.sub;

      return session;
    },
  },
};

// "globalEnv": ["NEXTAUTH_SECRET", "NEXTAUTH_URL", "GOOGLE_CLIENT_ID", "GOOLE_CLIENT_SECRET"],
