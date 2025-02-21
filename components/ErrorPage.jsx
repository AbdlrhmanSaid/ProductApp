"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ErrorPage({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("🚨 خطأ:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-6xl font-bold text-red-500">⚠️ خطأ!</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mt-3">
        حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى لاحقًا.
      </p>
      <div className="mt-5 flex space-x-4">
        <button
          onClick={reset}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
        >
          🔄 إعادة المحاولة
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          ⬅️ العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}
