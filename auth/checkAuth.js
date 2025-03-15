"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ErrorLogin from "@/components/ErrorLogin";

const CheckAuth = ({ children }) => {
  const user = useSelector((state) => state.user.userData);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsChecking(true);
      router.replace("/login");
    } else {
      setIsChecking(false);
    }
  }, [user, router]);

  if (isChecking) return <ErrorLogin />;

  return user ? children : <ErrorLogin />;
};

export default CheckAuth;
