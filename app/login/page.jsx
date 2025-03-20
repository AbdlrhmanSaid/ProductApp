"use client";

import React from "react";
import useLogin from "@/hooks/useLogin";

const LoginPage = () => {
  const {
    user,
    formData,
    errorMessage,
    isLoading,
    isBlocked,
    countdown,
    handleChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      {user ? (
        <p className="text-xl font-semibold text-green-600">
          تم تسجيل الدخول بنجاح
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 bg-white border border-gray-300 rounded-lg shadow-md w-96"
        >
          <h2 className="text-center text-2xl font-bold text-[#1976D2]">
            تسجيل الدخول
          </h2>

          {errorMessage && (
            <p className="bg-red-600 text-white text-center p-2 rounded-md">
              {errorMessage}
            </p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="أدخل البريد الإلكتروني"
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1976D2] focus:outline-none"
            disabled={isLoading || isBlocked}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="أدخل كلمة المرور"
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1976D2] focus:outline-none"
            disabled={isLoading || isBlocked}
          />

          <button
            type="submit"
            className={`p-3 text-white rounded-md transition duration-300 ${
              isBlocked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1976D2] hover:bg-[#1565C0]"
            }`}
            disabled={isLoading || isBlocked}
          >
            {isBlocked
              ? `محاولات محظورة (${countdown} ثانية)`
              : isLoading
              ? "جاري تسجيل الدخول..."
              : "تسجيل الدخول"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
