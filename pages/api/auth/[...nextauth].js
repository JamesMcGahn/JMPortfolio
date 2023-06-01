import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User.js";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        username: { label: "email", type: "text", placeholder: "bob@bob.com" },
        password: { label: "password", type: "password", placeholder: "" },
      },

      async authorize(credentials, req) {
        try {
          await dbConnect();
          const username = credentials.username;
          const userFound = await User.findOne({ username });
          console.log(credentials.username);
          console.log(userFound);
          if (!userFound) {
            return null;
          }
          const valid = await bcrypt.compare(
            credentials.password,
            userFound.password
          );
          console.log("passowrd", valid);
          if (valid) {
            console.log("here- valid");
            return { email: username };
          } else {
            return "/dashboard/error";
          }
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log(user.user);
      const isAllowedToSignIn = user.user.email === process.env.LOGIN;

      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/dashboard/login",
    signOut: "/auth/signout",
    error: "/error",
  },
  session: {
    jwt: true,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
};

export default NextAuth(authOptions);
