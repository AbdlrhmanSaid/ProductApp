"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function AuthGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && status === "unauthenticated" && pathname !== "/login") {
      router.replace("/login");
    }
  }, [status, router, isMounted, pathname]);

  if (!isMounted || status === "loading") {
    return <Loading />;
  }

  return children;
}
