"use client";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Loading from "@/components/Loading";
import useEditProduct from "@/api/useEditProduct";
import CheckAuth from "@/auth/CheckAuth";

export default function EditProduct() {
  const {
    fetchProduct,
    product,
    loading,
    updateProduct,
    handleBlur,
    handlePriceChange,
    handleChange,
    id,
    handleQuantityChange,
  } = useEditProduct();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <CheckAuth>
      <div className="h-screen flex justify-between items-center">
        <div className="max-w-lg mx-auto bg-white p-5 rounded shadow">
          <h1 className="text-2xl font-bold mb-5 flex items-center gap-1 justify-center">
            <span>
              <MdEdit />
            </span>
            <span>تعديل المنتج</span>
          </h1>
          <form onSubmit={updateProduct} className="space-y-3">
            <input
              type="text"
              name="title"
              value={product?.title}
              onChange={handleChange}
              placeholder="اسم المنتج"
              className="border p-2 w-full"
            />
            <input
              type="number"
              name="price"
              value={product?.price}
              onChange={handlePriceChange}
              onBlur={handleBlur}
              placeholder="السعر"
              className="border p-2 w-full"
              min="0"
            />
            <input
              type="text"
              name="category"
              value={product?.category}
              onChange={handleChange}
              placeholder="التصنيف"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="image"
              value={product?.image}
              onChange={handleChange}
              placeholder="رابط الصورة"
              className="border p-2 w-full"
            />
            <input
              type="number"
              name="quantity"
              value={product?.quantity}
              onChange={handleQuantityChange}
              placeholder="الكمية"
              className="border p-2 w-full"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              <FaCheckCircle />
            </button>
          </form>
        </div>
      </div>
    </CheckAuth>
  );
}
