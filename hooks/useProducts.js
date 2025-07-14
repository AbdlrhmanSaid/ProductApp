"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import ErrorPage from "@/components/ErrorPage";
import { useSelector } from "react-redux";
import sendMessage from "@/utils/sendMessage";

const baseUrls = [
  process.env.NEXT_PUBLIC_URL_API,
  process.env.NEXT_PUBLIC_SECPUBLIC_URL_API,
];

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const position = user?.position;

  // ✅ جلب المنتجات مع تجربة الرابط البديل في حالة فشل الأساسي
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    let success = false;

    for (const url of baseUrls) {
      try {
        const { data } = await axios.get(`${url}/api/products`);
        setProducts(data);
        success = true;
        break;
      } catch (err) {
        console.warn(`⚠️ فشل من ${url}`, err.message);
        continue;
      }
    }

    if (!success) {
      setError("❌ فشل في جلب المنتجات من جميع الروابط.");
    }

    setLoading(false);
  }, []);

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

    let success = false;

    for (const url of baseUrls) {
      try {
        await axios.delete(`${url}/api/products/${selectedProduct._id}`);
        setProducts((prev) =>
          prev.filter((product) => product._id !== selectedProduct._id)
        );
        await sendMessage({
          user: user.username,
          action: "حذف منتج",
          info: `${user.email}`,
        });
        success = true;
        break;
      } catch (err) {
        console.warn(`⚠️ فشل في حذف المنتج من ${url}`, err.message);
        continue;
      }
    }

    if (!success) {
      console.error("❌ فشل في حذف المنتج من جميع الروابط.");
    }

    handleClose();
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
