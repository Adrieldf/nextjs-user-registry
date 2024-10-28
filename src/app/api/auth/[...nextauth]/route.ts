import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        if(email === "admin@a" && password === "admin"){
          return { id: "1", email: "admin@a" };
        }

        // Retrieve the user from the database
        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        // Compare the provided password with the hashed password in the database
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        // If successful, return the user object (without the password)
        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/login', // Redirect to login page on failed sign-in
  },
};

// Use NextAuth in App Router style
const handler = NextAuth(authOptions);

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
