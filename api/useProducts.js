"use client";
import { useState } from "react";
import axios from "axios";
import ErrorPage from "@/components/ErrorPage";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://nodeproject-production-dc03.up.railway.app/getProducts",
        { mode: "cors" }
      );
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const deleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      await axios.delete(
        `https://nodeproject-production-dc03.up.railway.app/deleteProduct/${selectedProduct._id}`
      );
      setProducts(
        products.filter((product) => product._id !== selectedProduct._id)
      );
      handleClose();
    } catch (err) {
      console.error("❌ خطأ في حذف المنتج:", err);
    }
  };

  const categories = products.map((product) => product.category.toUpperCase());
  const uniqueCategories = [...new Set(categories)];

  const filteredProducts =
    search !== ""
      ? products.filter(
          (product) =>
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        )
      : products;

  if (error) {
    return <ErrorPage error={error} />;
  }

  return {
    products,
    setProducts,
    loading,
    setLoading,
    search,
    setSearch,
    open,
    selectedProduct,
    setSelectedProduct,
    error,
    setError,
    fetchProducts,
    handleOpen,
    handleClose,
    deleteProduct,
    categories,
    uniqueCategories,
    filteredProducts,
  };
};

export default useProducts;
