"use client";

import { useState, useCallback } from "react";

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
      const res = await fetch(
        `https://nodeproject-production-beec.up.railway.app/api/products/${id}`,
        { signal }
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();

      setProduct((prevProduct) =>
        JSON.stringify(prevProduct) !== JSON.stringify(data)
          ? data
          : prevProduct
      );
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("خطأ في جلب المنتج، حاول مرة أخرى.");
        console.error("Error fetching product:", err);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  return { getProduct, product, loading, error };
};

export default useProduct;
