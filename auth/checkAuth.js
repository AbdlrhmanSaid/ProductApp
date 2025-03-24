"use client";

import { useEffect, useState, useCallback } from "react";
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

  const fetchUserData = useCallback(() => {
    try {
      const storedUser = sessionStorage.getItem("user_data");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    } catch (error) {
      console.error("فشل تحميل بيانات المستخدم:", error);
    } finally {
      setIsChecking(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      fetchUserData();
    } else {
      setIsChecking(false);
    }
  }, [user, fetchUserData]);

  useEffect(() => {
    if (!isChecking && !user) {
      router.replace("/login");
    }
  }, [user, router, isChecking]);

  if (isChecking) return <Loading title="التحقق من الصلاحيات..." />;

  return user ? children : <ErrorLogin />;
};

export default CheckAuth;
