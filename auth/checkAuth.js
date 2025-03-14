"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import ErrorLogin from "@/components/ErrorLogin";

const CheckAuth = ({ children }) => {
  const user = useSelector((state) => state.user.userData);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user_data");
    if (storedUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  if (!isAuthenticated) {
    return <ErrorLogin />;
  }

  return children;
};

export default CheckAuth;
