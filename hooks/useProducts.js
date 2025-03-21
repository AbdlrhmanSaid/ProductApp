"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import ErrorPage from "@/components/ErrorPage";
import { useSelector } from "react-redux";

const API_BASE_URL = "https://nodeproject-production-dc03.up.railway.app";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const position = user?.position;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/getProducts`);
        setProducts(data);
      } catch (err) {
        console.error("❌ خطأ في جلب المنتجات:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      await axios.delete(
        `${API_BASE_URL}/deleteProduct/${selectedProduct._id}`
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== selectedProduct._id)
      );
      handleClose();
    } catch (err) {
      console.error("❌ خطأ في حذف المنتج:", err);
    }
  }, [selectedProduct, handleClose]);

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
    fetchProducts: () => {},
    handleOpen,
    handleClose,
    deleteProduct,
    uniqueCategories,
    filteredProducts,
    position,
  };
};

export default useProducts;
