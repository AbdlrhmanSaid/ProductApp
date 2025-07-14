"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useProducts from "@/hooks/useProducts";

const baseUrls = [
  process.env.NEXT_PUBLIC_URL_API,
  process.env.NEXT_SECPUBLIC_URL_API,
];

const useStandProducts = () => {
  const { id } = useParams();
  const [stand, setStand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { products } = useProducts();

  // ✅ جلب بيانات الرف من أكثر من رابط
  useEffect(() => {
    if (!id) return;

    const fetchStand = async () => {
      setLoading(true);
      setError("");

      let success = false;

      for (const baseUrl of baseUrls) {
        try {
          const res = await fetch(`${baseUrl}/api/stands/${id}`);
          if (!res.ok) throw new Error("استجابة غير صالحة");
          const data = await res.json();
          setStand(data);
          success = true;
          break;
        } catch (err) {
          console.warn(`⚠️ فشل تحميل بيانات الرف من ${baseUrl}`, err.message);
          continue;
        }
      }

      if (!success) {
        setError("حدث خطأ أثناء تحميل بيانات الرف.");
      }

      setLoading(false);
    };

    fetchStand();
  }, [id]);

  // ✅ تحديث بيانات الرف عبر أكثر من رابط
  const updateStandProducts = async (action, payload) => {
    let success = false;

    for (const baseUrl of baseUrls) {
      try {
        const res = await fetch(`${baseUrl}/api/stands/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, ...payload }),
        });

        if (!res.ok) throw new Error("فشل التحديث");
        const data = await res.json();
        setStand(data.stand);
        success = true;
        break;
      } catch (err) {
        console.warn(`⚠️ فشل في التحديث من ${baseUrl}`, err.message);
        continue;
      }
    }

    if (!success) {
      console.error("❌ فشل في تعديل المنتجات من جميع الروابط.");
    }
  };

  const handleAddProduct = (productId) => {
    updateStandProducts("add", { productId: [productId] });
  };

  const handleRemoveProduct = (productId) => {
    updateStandProducts("remove", { productId });
  };

  const filteredProducts = products.filter((product) => product.quantity > 0);

  return {
    stand,
    loading,
    error,
    filteredProducts,
    handleAddProduct,
    handleRemoveProduct,
  };
};

export default useStandProducts;
