import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: 'bob@bob.com' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },

      async authorize(
        credentials: Record<'username' | 'password', string> | undefined,
      ) {
        try {
          await dbConnect();
          if (!credentials?.username) {
            return null;
          }

          const { username } = credentials;
          const userFound = await User.findOne({ username });
          if (!userFound) {
            return null;
          }
          const valid = await bcrypt.compare(
            credentials.password,
            userFound.password,
          );
          if (valid) {
            return {
              id: userFound._id,
              name: userFound.name,
              email: userFound.username,
            };
          }
          return null;
          // return '/dashboard/error';
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      const isAllowedToSignIn = user.user.email === process.env.LOGIN;

      if (isAllowedToSignIn) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: '/dashboard/login',
    signOut: '/auth/signout',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
