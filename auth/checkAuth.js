"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import ErrorLogin from "@/components/ErrorLogin";
import { setUser } from "@/store/slices/userSlice";
import Loading from "@/components/Loading";

const CheckAuth = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user_data");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, router, isLoading]);

  if (isLoading) return <Loading />;

  return user ? children : <ErrorLogin />;
};

export default CheckAuth;
