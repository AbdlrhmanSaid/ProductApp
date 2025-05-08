"use client";
import React from "react";
import useAddUser from "@/hooks/useAddUser";
import Spinner from "@/components/Spinner";
import CheckAuth from "@/auth/checkAuth";
import NotAdmin from "@/auth/NotAdmin";
import NavPage from "@/components/NavPage";
import { FiPlusCircle } from "react-icons/fi";
import PreViewData from "@/components/PreViewData";

const AddUserForm = () => {
  const { formData, loading, error, handleChange, handleSubmit } = useAddUser();

  return (
    <CheckAuth>
      <NotAdmin>
        <NavPage link={"اضافة مستخدم"} next={true} />
        <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-gray-50 p-4 md:p-6 rounded-lg gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
            <h1 className="text-2xl font-bold text-[#1976D2] flex items-center gap-2 mb-5">
              <FiPlusCircle className="text-3xl text-[#1976D2]" />
              إضافة مستخدم جديد
            </h1>
            {error && (
              <p className="text-red-500 bg-red-100 p-3 rounded-md text-center font-semibold">
                {error}
              </p>
            )}
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="username"
                placeholder="اسم المستخدم"
                value={formData.username}
                onChange={handleChange}
                className="border p-3 w-full rounded-lg focus:outline-[#1976D2] shadow-sm"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                className="border p-3 w-full rounded-lg focus:outline-[#1976D2] shadow-sm"
                required
              />
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="border p-3 w-full rounded-lg focus:outline-[#1976D2] shadow-sm"
              >
                <option value="normal">normal</option>
                <option value="owner">owner</option>
                <option value="admin">admin</option>
              </select>
              <input
                type="password"
                name="password"
                placeholder="كلمة المرور"
                value={formData.password}
                onChange={handleChange}
                className="border p-3 w-full rounded-lg focus:outline-[#1976D2] shadow-sm"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="تأكيد كلمة المرور"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border p-3 w-full rounded-lg focus:outline-[#1976D2] shadow-sm"
                required
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#1976D2] text-white px-4 py-3 rounded-lg hover:bg-[#155a9b] transition font-semibold shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <FiPlusCircle className="text-xl" />
                    إضافة المستخدم
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="hidden md:block w-full max-w-lg">
            <h1 className="text-2xl font-bold text-[#1976D2] flex items-center gap-2 mb-5">
              المستخدم
            </h1>
            <PreViewData
              data={"user"}
              username={formData.username}
              email={formData.email}
              position={formData.position}
            />
          </div>
        </div>
      </NotAdmin>
    </CheckAuth>
  );
};

export default AddUserForm;
