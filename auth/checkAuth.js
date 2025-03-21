"use client";

import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import ErrorLogin from "@/components/ErrorLogin";
import { setUser } from "@/store/slices/userSlice";
import Loading from "@/components/Loading";

const CheckAuth = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user_data");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
    setIsChecking(false);
  }, [dispatch]);

  useEffect(() => {
    if (!isChecking && !user) {
      router.replace("/login");
    }
  }, [user, router, isChecking]);

  const content = useMemo(() => {
    if (isChecking) return <Loading />;
    return user ? children : <ErrorLogin />;
  }, [isChecking, user, children]);

  return content;
};

export default CheckAuth;
