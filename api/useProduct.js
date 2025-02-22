"use client";
import { useState } from "react";

const useProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProduct = async (id) => {
    if (!id) return;

    try {
      const res = await fetch(
        `https://nodeproject-production-dc03.up.railway.app/getProducts/${id}`
      );
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  return { getProduct, product, loading };
};

export default useProduct;
