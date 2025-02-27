import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            "https://nodeproject-production-dc03.up.railway.app/getUserByEmail",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: credentials.email }),
            }
          );

          if (!res.ok) {
            throw new Error(
              "المستخدم غير موجود أو البريد الإلكتروني غير صحيح."
            );
          }

          const user = await res.json();

          if (!user || !user.password) {
            throw new Error("المستخدم غير موجود أو كلمة المرور غير صحيحة.");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("كلمة المرور غير صحيحة.");
          }

          return {
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.position,
          };
        } catch (error) {
          console.error("Error in authentication:", error);
          throw new Error(
            "فشل تسجيل الدخول، تحقق من البريد الإلكتروني وكلمة المرور."
          );
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
