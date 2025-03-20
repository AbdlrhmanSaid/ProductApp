"use client";

import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";

const ErrorLogin = lazy(() => import("@/components/ErrorLogin"));
const Loading = lazy(() => import("@/components/Loading"));
const checkAuth = lazy(() => import("@/auth/checkAuth"));

const ProfilePage = () => {
  const user = useSelector((state) => state.user.userData);

  if (!user)
    return (
      <Suspense fallback={<Loading />}>
        <ErrorLogin />
      </Suspense>
    );

  return (
    <checkAuth>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-5">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-[#1976D2] mb-6">
            بيانات المستخدم
          </h1>

          <div className="flex flex-col items-center">
            <img
              src={user?.avatar || "/default-avatar.png"}
              alt="صورة المستخدم"
              className="w-24 h-24 rounded-full border-4 border-[#1976D2] shadow-md"
            />

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
    </checkAuth>
  );
};

export default ProfilePage;
