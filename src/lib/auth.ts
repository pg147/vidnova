// Next-auth
import { NextAuthOptions } from "next-auth";

// Next-auth Providers
import CredentialsProvider from "next-auth/providers/credentials";

// Services
import { AuthorizeAndLoginUser } from "@/services/authServices";

// Libs
import { dbConnect } from "@/lib/db";

// Types
import { User } from "@/types";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing required fields!");
                }

                try {
                    await dbConnect();  // connecting to database

                    // Logging in the user with a desired service
                    const user: User = await AuthorizeAndLoginUser(credentials.email, credentials.password);

                    // If user id is missing
                    if (!user._id) return null;

                    return { id: user._id?.toString(), email: user.email }
                } catch (error) {
                    console.error("Auth error :", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },

        async session({ session, token }) {
            if (session) {
                session.user.id = token.id as string;
            }

            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60 // 7 days
    },
    secret: process.env.NEXT_AUTH_SECRET
}