"use client";

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/slices/userSlice";
import Loading from "@/components/Loading";

const CheckAuth = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const fetchUserData = useCallback(async () => {
    try {
      // تحقق من وجود بيانات المستخدم في sessionStorage أولاً
      const sessionUser = sessionStorage.getItem("user_data");
      if (sessionUser) {
        const parsedUser = JSON.parse(sessionUser);
        dispatch(setUser(parsedUser));
        return;
      }

      // إذا لم توجد في sessionStorage، قم بجلبها من الخادم
      const response = await fetch("/api/auth/verify", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("فشل التحقق من المصادقة");

      const userData = await response.json();
      sessionStorage.setItem("user_data", JSON.stringify(userData));
      dispatch(setUser(userData));
    } catch (error) {
      console.error("فشل تحميل بيانات المستخدم:", error);
      sessionStorage.removeItem("user_data");
      router.replace("/login");
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  if (!user) {
    return <Loading title="جاري التحقق من المصادقة..." />;
  }

  return children;
};

export default CheckAuth;
