"use client";
import { useState, useEffect } from "react";
import ErrorLogin from "@/components/ErrorLogin";

const CheckAuth = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(sessionStorage.getItem("user_id"));
  }, []);

  if (userId === null) {
    return <ErrorLogin />;
  }

  return <>{userId ? children : <ErrorLogin />}</>;
};

export default CheckAuth;
