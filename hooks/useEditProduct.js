"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

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

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://nodeproject-production-dc03.up.railway.app/getProducts/${id}`
        );
        setProduct((prev) => ({
          ...prev,
          ...data,
          price: data.price.toString(),
        }));
      } catch (error) {
        console.error("❌ خطأ في جلب المنتج:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }, []);

  const updateProduct = useCallback(
    async (e) => {
      e.preventDefault();
      if (!id) return;

      try {
        setLoading(true);
        await axios.patch(
          `https://nodeproject-production-dc03.up.railway.app/updateProduct/${id}`,
          { ...product, price: parseFloat(product.price) }
        );

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
    [product, id, router]
  );

  return { product, loading, handleChange, updateProduct };
};

export default useEditProduct;
