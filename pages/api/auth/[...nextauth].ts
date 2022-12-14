import NextAuth, { Account, NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import {
  getUser,
  createUser,
  ReqUser,
  ResUser,
} from "../../../lib/users/users";
import getEnvVar from "../../../utils/getEnvVar";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: getEnvVar("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVar("GITHUB_CLIENT_SECRET"),
    }),
    GoogleProvider({
      clientId: getEnvVar("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvVar("GOOGLE_CLIENT_SECRET"),
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: getEnvVar("SECRET"),
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
        token.account = account;
        token.profile = profile;
      }
      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      session.user = token.user as User;
      return Promise.resolve(session);
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if (user !== null) {
          (await getUser(user.id)) ??
            (await createUser(toReqUser(user, account)));
          const data = await getUser(user.id);
          setResUser(user, data as unknown as ResUser);
          return true;
        }
        return false;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

const toReqUser = (user: User, account: Account) => {
  const reqUser: ReqUser = {
    id: user.id,
    email: user.email as string,
    name: user.name as string,
    image: user.image as string,
    provider: account.provider,
  };
  return reqUser;
};

const setResUser = (user: User, resUser: ResUser) => {
  user._id = resUser._id;
  user.id = resUser.id;
  user.email = resUser.email;
  user.name = resUser.name;
  user.provider = resUser.provider;
  user.image = resUser.image;
  user.following = resUser.following;
  user.follower = resUser.follower;
};
