"use client";

import ErrorLogin from "@/components/ErrorLogin";
import { useSession } from "next-auth/react";

const CheckAuth = ({ children }) => {
  const { data: session } = useSession();

  return <>{session ? children : <ErrorLogin />}</>;
};

export default CheckAuth;
