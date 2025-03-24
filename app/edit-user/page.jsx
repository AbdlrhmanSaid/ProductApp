"use client";
import React, { Suspense } from "react";
import useEditUser from "@/hooks/useEditUser";
import Spinner from "@/components/Spinner";
import Loading from "@/components/Loading";
import CheckAuth from "@/auth/checkAuth";
import NotAdmin from "@/auth/notAdmin";
import NavPage from "@/components/NavPage";

const EditUserFormContent = () => {
  const { formData, loading, error, handleChange, handleSubmit } =
    useEditUser();

  if (loading) return <Loading />;

  return (
    <CheckAuth>
      <NotAdmin>
        <NavPage link={"تعديل مستخدم"} next={true} />

        <div className="h-screen flex justify-between items-center" rounded>
          <div className="container mx-auto mt-5 bg-white p-5 rounded shadow">
            <h1 className="text-3xl font-bold mb-4">تعديل بيانات المستخدم</h1>
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

              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                {loading ? <Spinner /> : "تحديث المستخدم"}
              </button>
            </form>
          </div>
        </div>
      </NotAdmin>
    </CheckAuth>
  );
};

const EditUserForm = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EditUserFormContent />
    </Suspense>
  );
};

export default EditUserForm;
