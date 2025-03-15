"use client";
import { useSelector } from "react-redux";
import CheckAuth from "@/auth/checkAuth";

const Page = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <CheckAuth>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            بيانات المستخدم
          </h1>

          <div className="flex flex-col items-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="صورة المستخدم"
                className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                لا توجد صورة
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-lg text-gray-700">
                <strong className="text-gray-900">الاسم: </strong>
                {user?.username || "غير متوفر"}
              </p>
              <p className="text-lg text-gray-700 mt-2">
                <strong className="text-gray-900">البريد الإلكتروني: </strong>
                {user?.email || "غير متوفر"}
              </p>
              <p className="text-lg text-gray-700 mt-2">
                <strong className="text-gray-900"> الصلاحيه: </strong>
                {user?.position || "غير متوفر"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CheckAuth>
  );
};

export default Page;
