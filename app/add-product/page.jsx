"use client";
import useAddProduct from "@/api/useAddProduct";
import Loading from "@/components/Loading";
import CheckAuth from "@/auth/checkAuth";

export default function AddProduct() {
  const { error, loading, addProduct, product, handleChange } = useAddProduct();

  if (loading) return <Loading />;

  return (
    <CheckAuth>
      <div className="h-screen flex justify-between items-center">
        <div className=" m-auto bg-white p-5 rounded shadow ">
          <h1 className="text-2xl font-bold mb-5">➕ إضافة منتج جديد</h1>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={addProduct} className="space-y-3">
            <input
              type="text"
              name="title"
              placeholder="اسم المنتج"
              value={product?.title}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="السعر"
              value={product?.price}
              onChange={handleChange}
              className="border p-2 w-full"
              min="0"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="الفئة"
              value={product?.category}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="image"
              placeholder="رابط الصورة"
              value={product?.image}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              ➕ إضافة المنتج
            </button>
          </form>
        </div>
      </div>
    </CheckAuth>
  );
}
