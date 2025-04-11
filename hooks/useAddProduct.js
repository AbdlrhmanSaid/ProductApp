"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import sendMessage from "@/utils/sendMessage";

const useAddProduct = () => {
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? value.replace(/[^0-9.]/g, "") : value,
    }));
  }, []);

  const addProduct = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);

      if (!product.title.trim() || !product.price || !product.category.trim()) {
        setError("❌ الحقول التالية مطلوبة: العنوان، السعر، الفئة!");
        return;
      }

      const priceValue = parseFloat(product.price);
      if (isNaN(priceValue) || priceValue <= 0) {
        setError("❌ السعر يجب أن يكون رقمًا موجبًا!");
        return;
      }

      try {
        setLoading(true);
        const productData = {
          title: product.title.trim(),
          price: priceValue,
          category: product.category.trim(),
          ...(product.image.trim() && { image: product.image.trim() }),
        };

        const response = await fetch(
          "https://nodeproject-production-dc03.up.railway.app/api/products",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "❌ فشل في إرسال البيانات!");
        }

        await sendMessage({
          user: userData.username,
          action: "اضافة منتج",
          info: `${userData.email} أضاف منتج: ${product.title}`,
        });

        router.push("/");
      } catch (error) {
        setError(error.message || "❌ حدث خطأ أثناء الإرسال!");
      } finally {
        setLoading(false);
      }
    },
    [product, router, userData]
  );

  return { error, addProduct, product, handleChange, loading };
};

export default useAddProduct;
