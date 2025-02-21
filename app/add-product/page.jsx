"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function AddProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? value.replace(/[^0-9.]/g, "") : value,
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !product.title ||
      !product.category ||
      !product.image ||
      !product.price
    ) {
      setError("❌ جميع الحقول مطلوبة!");
      return;
    }

    const priceValue = Number(product.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError("❌ السعر يجب أن يكون رقمًا موجبًا!");
      return;
    }

    const newProduct = { ...product, price: priceValue };

    try {
      setLoading(true);
      const response = await fetch(
        "https://nodeproject-production-dc03.up.railway.app/postProduct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );
      setLoading(false);
      if (!response.ok) {
        throw new Error("فشل في إرسال البيانات!");
      }

      router.push("/");
    } catch (error) {
      setError(error.message || "❌ حدث خطأ أثناء الإرسال!");
    }
  };
  if (loading) return <Loading />;

  return (
    <div className="max-w-lg mx-auto bg-white p-5 rounded shadow">
      <h1 className="text-2xl font-bold mb-5">➕ إضافة منتج جديد</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={addProduct} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="اسم المنتج"
          value={product.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={product.price}
          onChange={handleChange}
          className="border p-2 w-full"
          min="0"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="الفئة"
          value={product.category}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="رابط الصورة"
          value={product.image}
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
  );
}
