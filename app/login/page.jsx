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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {user ? (
        <p className="text-xl font-semibold text-green-600">
          تم تسجيل الدخول بنجاح
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow-lg w-96"
        >
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
            className="p-2 border rounded-md"
            disabled={isLoading || isBlocked}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="أدخل كلمة المرور"
            className="p-2 border rounded-md"
            disabled={isLoading || isBlocked}
          />
          <button
            type="submit"
            className={`p-2 text-white rounded-md ${
              isBlocked ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
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
