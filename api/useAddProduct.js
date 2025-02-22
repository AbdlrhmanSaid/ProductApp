"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
const useAddProduct = () => {
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
  return { error, addProduct, product, handleChange };
};

export default useAddProduct;
