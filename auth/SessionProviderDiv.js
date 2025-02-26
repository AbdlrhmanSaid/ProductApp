"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const SessionProviderDiv = ({ children, session }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <p>جارٍ تحميل البيانات...</p>;

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderDiv;
