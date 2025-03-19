"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ErrorLogin from "@/components/ErrorLogin";

const CheckAuth = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user.userData);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      setIsChecking(false);
    }
  }, [user, router]);

  if (isChecking) return <ErrorLogin />;

  return user ? children : <ErrorLogin />;
};

export default CheckAuth;
