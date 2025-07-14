"use client";

import { useState, useCallback } from "react";

const baseUrls = [
  process.env.NEXT_PUBLIC_URL_API,
  process.env.NEXT_SECPUBLIC_URL_API,
];

const useProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProduct = useCallback(async (id) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      let success = false;
      let data = null;

      for (const baseUrl of baseUrls) {
        try {
          const res = await fetch(`${baseUrl}/api/products/${id}`, { signal });

          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

          data = await res.json();
          success = true;
          break;
        } catch (err) {
          if (err.name === "AbortError") {
            console.warn("Request aborted");
            return;
          }
          console.warn(`⚠️ فشل من الرابط: ${baseUrl}`, err.message);
        }
      }

      if (!success || !data) throw new Error("فشل في جلب بيانات المنتج");

      setProduct((prevProduct) =>
        JSON.stringify(prevProduct) !== JSON.stringify(data)
          ? data
          : prevProduct
      );
    } catch (err) {
      setError("خطأ في جلب المنتج، حاول مرة أخرى.");
      console.error("❌ Error fetching product:", err);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  return { getProduct, product, loading, error };
};

export default useProduct;
