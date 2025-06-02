"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useProducts from "@/hooks/useProducts";

const API_URL = `${process.env.NEXT_PUBLIC_URL_API}/api/stands`;

const useStandProducts = () => {
  const { id } = useParams();
  const [stand, setStand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { products } = useProducts();

  useEffect(() => {
    if (!id) return;

    const fetchStand = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("فشل في تحميل بيانات الرف");
        const data = await res.json();
        setStand(data);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل بيانات الرف.");
      } finally {
        setLoading(false);
      }
    };

    fetchStand();
  }, [id]);

  const updateStandProducts = async (action, payload) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });

      if (!res.ok) throw new Error("فشل التحديث");
      const data = await res.json();
      setStand(data.stand);
    } catch (err) {
      console.error("فشل في تعديل المنتجات:", err);
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
