"use client";
import useAddProduct from "@/hooks/useAddProduct";
import Loading from "@/components/Loading";
import CheckAuth from "@/auth/checkAuth";
import { FiPlusCircle } from "react-icons/fi";
import NotAdmin from "@/auth/NotAdmin";
import NavPage from "@/components/NavPage";
import PreViewData from "@/components/PreViewData";

export default function AddProduct() {
  const { error, loading, addProduct, product, handleChange } = useAddProduct();

  if (loading) return <Loading />;

  return (
    <CheckAuth>
      <NotAdmin>
        <NavPage link={"اضافة منتج"} next={true} />
        <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-gray-50 p-4 md:p-6 rounded-lg gap-6">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
            <h1 className="text-2xl font-bold text-[#1976D2] flex items-center gap-2 mb-5">
              <FiPlusCircle className="text-3xl text-[#1976D2]" />
              إضافة منتج جديد
            </h1>
            {error && (
              <p className="text-red-500 bg-red-100 p-3 rounded-md text-center font-semibold">
                {error}
              </p>
            )}
            <form className="flex flex-col w-full gap-4" onSubmit={addProduct}>
              <input
                type="text"
                name="title"
                placeholder="اسم المنتج"
                value={product?.title}
                onChange={handleChange}
                className="border p-3 w-full rounded-lg focus:outline-[#1976D2] shadow-sm"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="السعر"
                value={product?.price}
                onChange={handleChange}
                className="border p-3 w-full rounded-lg focus:outline-[#1976D2] shadow-sm"
                min="0"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="الفئة"
                value={product?.category}
                onChange={handleChange}
                className="border p-3 w-full rounded-lg focus:outline-[#1976D2] shadow-sm"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="رابط الصورة"
                value={product?.image}
                onChange={handleChange}
                className="border p-3 w-full rounded-lg focus:outline-[#1976D2] shadow-sm"
                
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#1976D2] text-white px-4 py-3 rounded-lg hover:bg-[#155a9b] transition font-semibold shadow-md"
              >
                <FiPlusCircle className="text-xl" />
                إضافة المنتج
              </button>
            </form>
          </div>
          <div className="hidden md:block w-full max-w-lg">
            <h1 className="text-2xl font-bold text-[#1976D2] flex items-center gap-2 mb-5">
              المنتج
            </h1>
            <PreViewData
              data={"product"}
              image={product.image}
              title={product.title}
              category={product.category}
              price={product.price}
            />
          </div>
        </div>
      </NotAdmin>
    </CheckAuth>
  );
}
