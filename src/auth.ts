import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username / Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                // Ensure string types
                const identifier = credentials.username as string;
                const password = credentials.password as string;

                try {
                    // Check if sponsor
                    const sponsor = await prisma.sponsor.findFirst({
                        where: {
                            OR: [
                                { username: identifier },
                                { email: identifier },
                            ],
                        },
                    });

                    if (sponsor) {
                        // Note: In old system it was pure md5, but we'll use bcrypt for new, 
                        // you might need a custom check if you are importing old data
                        // For now, assuming new users logic:
                        const isMatch = await bcrypt.compare(password, sponsor.password);

                        if (isMatch) {
                            return {
                                id: sponsor.id.toString(),
                                name: sponsor.fullName,
                                email: sponsor.email,
                                role: 'sponsor',
                            };
                        }
                    }

                    // Check if user (admin)
                    const admin = await prisma.user.findUnique({
                        where: { email: identifier },
                    });

                    if (admin) {
                        const isMatch = await bcrypt.compare(password, admin.password);
                        if (isMatch) {
                            return {
                                id: admin.id.toString(),
                                name: admin.firstName,
                                email: admin.email,
                                role: 'admin',
                            };
                        }
                    }

                    return null;

                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
});
