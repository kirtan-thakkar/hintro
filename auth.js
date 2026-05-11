import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // Mock authentication based on README (u1 for empty state, u2 for populated state)
        if (credentials.email.includes("u1")) {
          return { id: "u1", email: credentials.email, name: "New User" };
        } else {
          // Defaulting to u2 (populated dashboard data)
          return { id: "u2", email: credentials.email, name: "Active User" };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
})