"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/store/slices/userSlice";
import { lazy, Suspense } from "react";
import { IoPerson } from "react-icons/io5";

const ErrorLogin = lazy(() => import("@/components/ErrorLogin"));
const Loading = lazy(() => import("@/components/Loading"));
const CheckAuth = lazy(() => import("@/auth/checkAuth"));

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user_data");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <Suspense fallback={<Loading />}>
        <Loading />
      </Suspense>
    );
  }

  if (!user) {
    return (
      <Suspense fallback={<Loading />}>
        <ErrorLogin />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <CheckAuth>
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-5">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-[#1976D2] mb-6">
              بيانات المستخدم
            </h1>

            <div className="flex flex-col items-center">
              <IoPerson className="w-24 h-24 rounded-full border-4 bg-[#1976D2] border-[#1976D2] shadow-md text-white" />

              <div className="mt-4 text-center space-y-3">
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">الاسم: </strong>
                  {user?.username || "غير متوفر"}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">البريد الإلكتروني: </strong>
                  {user?.email || "غير متوفر"}
                </p>
                <p className="text-lg text-gray-700">
                  <strong className="text-gray-900">الصلاحية: </strong>
                  {user?.position || "غير متوفر"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CheckAuth>
    </Suspense>
  );
};

export default ProfilePage;
