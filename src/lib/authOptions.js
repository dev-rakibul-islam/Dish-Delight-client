import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { API_BASE_URL } from "./config";

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || "dev-internal-key";

const syncOAuthUser = async ({ email, name }) => {
  const response = await fetch(`${API_BASE_URL}/auth/oauth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-key": INTERNAL_API_KEY,
    },
    body: JSON.stringify({ email, name, provider: "google" }),
  });

  if (!response.ok) {
    console.error("Failed to sync OAuth user", await response.text());
    throw new Error("Unable to sync OAuth user");
  }

  return response.json();
};

const buildCredentialsProvider = () =>
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Invalid credentials");
      }

      const data = await response.json();
      return { ...data.user, accessToken: data.token };
    },
  });

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    buildCredentialsProvider(),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user?.email && user?.name) {
        const { user: syncedUser, token } = await syncOAuthUser({
          email: user.email,
          name: user.name,
        });
        user.id = syncedUser.id;
        user.role = syncedUser.role;
        user.accessToken = token;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role || "user";
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
