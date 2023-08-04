import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY || "",
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "username",
    //       type:"text",
    //       placeholder:"",
    //     },
    //   },
    //   async authorize(credentials) {

    //   }
    // })
  ],
  // pages: {
  //   signIn: "/signin",
  // },
};
