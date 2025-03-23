"use client";
import React from "react";
import useAddUser from "@/hooks/useAddUser";
import Spinner from "@/components/Spinner";
import CheckAuth from "@/auth/checkAuth";

const AddUserForm = () => {
  const { formData, loading, error, handleChange, handleSubmit } = useAddUser();

  return (
    <CheckAuth>
      <div className="h-screen flex justify-center items-center">
        <div className="container mt-5 bg-white p-5 rounded shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">
            إضافة مستخدم جديد
          </h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">اسم المستخدم:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">البريد الإلكتروني:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">الصلاحيات:</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="normal">normal</option>
                <option value="owner">owner</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">كلمة المرور:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">تأكيد كلمة المرور:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center w-full"
              disabled={loading}
            >
              {loading ? <Spinner /> : "إضافة المستخدم"}
            </button>
          </form>
        </div>
      </div>
    </CheckAuth>
  );
};

export default AddUserForm;
