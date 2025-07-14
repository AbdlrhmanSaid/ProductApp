"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import sendMessage from "@/utils/sendMessage";

const useEditProduct = () => {
  const router = useRouter();
  const { id } = useParams();
  const { userData } = useSelector((state) => state.user);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    quantity: 1,
  });

  const [loading, setLoading] = useState(false);

  const baseUrls = [
    process.env.NEXT_PUBLIC_URL_API,
    process.env.NEXT_PUBLIC_SECPUBLIC_URL_API,
  ];

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      let response;
      let success = false;

      for (const url of baseUrls) {
        try {
          response = await axios.get(`${url}/api/products/${id}`);
          success = true;
          break;
        } catch (err) {
          continue;
        }
      }

      if (!success) throw new Error("فشل في جلب المنتج من كل الروابط");

      const data = response.data;
      setProduct({
        title: data.title || "",
        price: data.price?.toString() || "0",
        category: data.category || "",
        image: data.image || "",
        quantity: data.quantity || 1,
      });
    } catch (error) {
      console.error("❌ خطأ في جلب المنتج:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handlePriceChange = useCallback((e) => {
    const { value } = e.target;
    if (!isNaN(value) && value >= 0) {
      setProduct((prev) => ({ ...prev, price: value }));
    }
  }, []);

  const handleBlur = useCallback(() => {
    if (isNaN(parseFloat(product.price))) {
      setProduct((prev) => ({ ...prev, price: "0" }));
    }
  }, [product]);

  const handleQuantityChange = useCallback((e) => {
    const { value } = e.target;
    setProduct((prev) => ({
      ...prev,
      quantity: Math.max(0, parseInt(value, 10) || 0),
    }));
  }, []);

  const updateProduct = useCallback(
    async (e) => {
      e.preventDefault();
      if (!id) return;

      setLoading(true);
      try {
        let success = false;

        for (const url of baseUrls) {
          try {
            await axios.patch(`${url}/api/products/${id}`, {
              ...product,
              price: parseFloat(product.price),
            });
            success = true;
            break;
          } catch (err) {
            continue;
          }
        }

        if (!success) throw new Error("فشل في تحديث المنتج");

        await sendMessage({
          user: userData.username,
          action: "تحديث منتج",
          info: `${userData.email} اسم المنتج ${product.title}`,
        });

        router.push("/");
      } catch (error) {
        console.error(
          "❌ خطأ في التحديث:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    },
    [product, id, router, userData]
  );

  return {
    product,
    loading,
    handleChange,
    handlePriceChange,
    handleBlur,
    handleQuantityChange,
    updateProduct,
    fetchProduct,
    id,
  };
};

export default useEditProduct;
