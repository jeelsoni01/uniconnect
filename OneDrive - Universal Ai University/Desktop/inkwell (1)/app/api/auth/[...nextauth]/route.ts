import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { connectToDatabase } from "@/lib/db"
import { validateUserCredentials } from "@/lib/models"

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(connectToDatabase().then(conn => {
    if (!conn.client) throw new Error("Failed to connect to MongoDB")
    return conn.client
  })),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await validateUserCredentials(credentials.email, credentials.password)

          if (!user) return null

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.username,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.id = token.sub
        session.user.username = token.username as string
      }
      return session
    },
    async jwt({ token, user, trigger, session }: { 
      token: any; 
      user: any; 
      trigger?: string; 
      session?: any 
    }) {
      if (user) {
        token.username = user.username
      }

      if (trigger === "update" && session?.username) {
        token.username = session.username
      }

      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
