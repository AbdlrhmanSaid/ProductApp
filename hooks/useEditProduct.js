"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";

const useEditProduct = () => {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      if (id) {
        const res = await axios.get(
          `https://nodeproject-production-dc03.up.railway.app/getProducts/${id}`
        );
        setProduct({
          ...res.data,
          price: res.data.price.toString(),
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("❌ خطأ في جلب المنتج:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setProduct({ ...product, price: value });
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setProduct({ ...product, quantity: parseInt(value) });
    }
  };

  const handleBlur = () => {
    if (product.price === "" || isNaN(product.price)) {
      setProduct({ ...product, price: "0" });
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    console.log("📤 البيانات المرسلة:", product);

    try {
      setLoading(true);
      await axios.patch(
        `https://nodeproject-production-dc03.up.railway.app/updateProduct/${id}`,
        { ...product, price: parseFloat(product.price) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error(
        "❌ خطأ في التحديث:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
  };

  return {
    product,
    loading,
    fetchProduct,
    handleChange,
    handlePriceChange,
    handleQuantityChange,
    handleBlur,
    updateProduct,
    id,
  };
};

export default useEditProduct;
