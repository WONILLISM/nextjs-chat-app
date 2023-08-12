import prisma from "@/lib/prisma";
import axios from "axios";
import { type NextAuthOptions, type TokenSet, type User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY || "",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (!user || !user.email) {
        return "/register";
      }
      const findUser = await prisma.user.findFirst({
        where: { email: user.email },
      });
      if (!findUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
          },
        });
        return "/login";
      }
      return true;
    },
    jwt: async ({ token, account, user, trigger, session }) => {
      // 초기 로그인시 User 정보를 가공하여 반환
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (!token.accessTokenExpires) {
        return {
          ...token,
          error: "not found access token expires",
        };
      }

      if (trigger === "update") {
        return { ...token, ...session };
      }

      const nowTime = Math.round(Date.now() / 1000);
      const shouldRefreshTime = token.accessTokenExpires - 10 * 60 - nowTime;
      // 토큰이 만료되지 않았을 때, 기존 토큰 반환
      if (shouldRefreshTime > 0) {
        return token;
      }

      return refreshAccessToken(token);
    },

    session: async ({ session, token }) => {
      session.user = token.user as User;
      session.accessToken = token.accessToken as string;
      session.accessTokenExpires = token.accessTokenExpires as number;
      session.error = token.error;
      return session;
    },
  },
};

const refreshAccessToken = async (token: JWT) => {
  try {
    const url = "https://oauth2.googleapis.com/token";

    const params = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    };

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const res = await axios.post(url, {
      headers,
      params,
    });

    const refreshedTokens: TokenSet = await res.data;

    if (res.status !== 200) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires:
        Math.round(Date.now() / 1000) + (refreshedTokens.expires_in as number),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error,
    };
  }
};
