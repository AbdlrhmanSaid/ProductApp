"use client";
import useAddProduct from "@/hooks/useAddProduct";
import Loading from "@/components/Loading";
import CheckAuth from "@/auth/checkAuth";
import { FiPlusCircle } from "react-icons/fi";
import NotAdmin from "@/auth/NotAdmin";
import NavPage from "@/components/NavPage";

export default function AddProduct() {
  const { error, loading, addProduct, product, handleChange } = useAddProduct();

  if (loading) return <Loading />;

  return (
    <CheckAuth>
      <NotAdmin>
        <NavPage link={"اضافة منتج"} next={true} />
        <div className="h-screen flex justify-center items-center bg-gray-100 rounded">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-[#1976D2] flex items-center gap-2 mb-5">
              <FiPlusCircle className="text-3xl text-[#1976D2]" />
              إضافة منتج جديد
            </h1>

            {error && (
              <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>
            )}

            <form onSubmit={addProduct} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="اسم المنتج"
                value={product?.title}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-[#1976D2]"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="السعر"
                value={product?.price}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-[#1976D2]"
                min="0"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="الفئة"
                value={product?.category}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-[#1976D2]"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="رابط الصورة"
                value={product?.image}
                onChange={handleChange}
                className="border p-3 w-full rounded-md focus:outline-[#1976D2]"
                required
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#1976D2] text-white px-4 py-2 rounded-md hover:bg-[#155a9b] transition"
              >
                <FiPlusCircle className="text-xl" />
                إضافة المنتج
              </button>
            </form>
          </div>
        </div>
      </NotAdmin>
    </CheckAuth>
  );
}
