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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // استدعاء Endpoint خاص بالمصادقة لإرجاع بيانات المستخدم مع كلمة المرور
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

          console.log("User record from /getUserByEmail:", user);

          if (!user) {
            throw new Error(
              "المستخدم غير موجود أو البريد الإلكتروني غير صحيح."
            );
          }

          // التأكد من وجود حقل كلمة المرور للمستخدم
          if (!user.password) {
            throw new Error("كلمة المرور غير موجودة لهذا المستخدم.");
          }

          // التحقق من صحة كلمة المرور باستخدام bcrypt
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("كلمة المرور غير صحيحة.");
          }

          // إعادة البيانات الضرورية للمستخدم في حال نجاح المصادقة
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
    signIn: "/login", // مسار صفحة تسجيل الدخول
  },
  secret: process.env.NEXTAUTH_SECRET, // تأكد من ضبط NEXTAUTH_SECRET في .env.local
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
