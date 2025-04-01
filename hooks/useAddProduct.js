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
    image: "", // هذا الحقل أصبح اختياريًا
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

      // التحقق من الحقول المطلوبة باستثناء الصورة
      if (!product.title || !product.price || !product.category) {
        setError("❌ الحقول التالية مطلوبة: العنوان، السعر، الفئة!");
        return;
      }

      const priceValue = Number(product.price);
      if (isNaN(priceValue) || priceValue <= 0) {
        setError("❌ السعر يجب أن يكون رقمًا موجبًا!");
        return;
      }

      try {
        setLoading(true);
        // إنشاء كائن المنتج بدون الصورة إذا كانت فارغة
        const productToSend = {
          title: product.title,
          price: priceValue,
          category: product.category,
          ...(product.image && { image: product.image }), // إضافة الصورة فقط إذا كانت موجودة
        };

        const response = await fetch(
          "https://nodeproject-production-dc03.up.railway.app/postProduct",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productToSend),
          }
        );

        if (!response.ok) throw new Error("❌ فشل في إرسال البيانات!");

        await sendMessage({
          user: userData.username,
          action: "اضافة منتج",
          info: `${userData.email}`,
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