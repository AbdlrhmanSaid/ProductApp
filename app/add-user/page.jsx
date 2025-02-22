"use client";
import React from "react";
import useAddUser from "@/api/useAddUser";
import Spinner from "@/components/Spinner";

const AddUserForm = () => {
  const { formData, loading, error, handleChange, handleSubmit } = useAddUser();

  return (
    <div className="h-screen flex justify-between items-center">
      <div className="container  mt-5 bg-white p-5 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">إضافة مستخدم جديد</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
              <option value="normal">مستخدم عادي</option>
              <option value="owner">مالك</option>
              <option value="admin">مشرف</option>
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
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            {loading ? <Spinner /> : "إضافة المستخدم"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
