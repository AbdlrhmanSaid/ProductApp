"use client";

import { useRouter } from "next/navigation";

export default function ErrorLogin() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">خطأ في الوصول</h1>
        <p className="text-lg text-gray-700 mb-6">
          عفواً، أنت غير مسجّل الدخول للوصول إلى هذه الصفحة.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          العودة إلى صفحة تسجيل الدخول
        </button>
      </div>
    </div>
  );
}
