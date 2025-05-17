"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import ErrorPage from "@/components/ErrorPage";
import { useSelector } from "react-redux";
import sendMessage from "@/utils/sendMessage";

const API_BASE_URL =
  "https://nodeproject-production-beec.up.railway.app/api/products";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const position = user?.position;

  // دالة جلب المنتجات
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}`);
      setProducts(data);
    } catch (err) {
      console.error("❌ خطأ في جلب المنتجات:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // استخدام useEffect لجلب المنتجات عند تحميل الصفحة
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpen = useCallback((product) => {
    setSelectedProduct(product);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedProduct(null);
  }, []);

  const deleteProduct = useCallback(async () => {
    if (!selectedProduct) return;
    try {
      await axios.delete(`${API_BASE_URL}/${selectedProduct._id}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== selectedProduct._id)
      );
      await sendMessage({
        user: user.username,
        action: "حذف منتج",
        info: `${user.email} `,
      });
      handleClose();
    } catch (err) {
      console.error("❌ خطأ في حذف المنتج:", err);
    }
  }, [selectedProduct, handleClose, user]);

  const uniqueCategories = useMemo(() => {
    return [
      ...new Set(products.map((product) => product.category.toUpperCase())),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  return {
    products,
    setProducts,
    loading,
    search,
    setSearch,
    open,
    selectedProduct,
    error,
    fetchProducts,
    handleOpen,
    handleClose,
    deleteProduct,
    uniqueCategories,
    filteredProducts,
    position,
  };
};

export default useProducts;
