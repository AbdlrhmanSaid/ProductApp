"use client";
import React from "react";
import useLogin from "@/hooks/useLogin";
import Image from "next/image";

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

  console.log(process.env.NEXT_PUBLIC_NEXTAUTH_URL);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl overflow-hidden">
        <div className="hidden md:flex w-1/2 text-blue-700  flex-col justify-center items-center p-10">
          <h1 className="text-3xl font-bold">! مرحبا بك</h1>
          <p className="mt-4 text-lg text-center leading-loose">
            نحن سعداء بعودتك! قم بتسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك
            وإدارة أعمالك بكل سهولة ومرونة.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-r from-blue-600 to-blue-400">
          {user ? (
            <p className="text-xl font-semibold text-green-600 text-center">
              تم تسجيل الدخول بنجاح
            </p>
          ) : (
            <>
              <Image
                src={"/favicon.png"}
                alt="icon"
                width={200}
                height={200}
                className="m-auto"
              />
              <h2 className="text-xl font-semibold text-white text-center mb-7">
                تسجيل الدخول
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-5 "
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
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  placeholder="أدخل البريد الإلكتروني"
                  disabled={isLoading || isBlocked}
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  placeholder="أدخل كلمة المرور"
                  disabled={isLoading || isBlocked}
                />

                <button
                  className={`w-full p-3 text-white font-semibold rounded-md transition duration-300 ${
                    isBlocked
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  type="submit"
                  disabled={isLoading || isBlocked}
                >
                  {isBlocked
                    ? `محاولات محظورة (${countdown} ثانية)`
                    : isLoading
                    ? "جاري تسجيل الدخول..."
                    : "تسجيل الدخول"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
