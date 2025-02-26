"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>
          مرحبًا، {session.user.name} ({session.user.role})
        </p>
        <button onClick={() => signOut()} className="btn">
          تسجيل الخروج
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()} className="btn">
      تسجيل الدخول
    </button>
  );
}
