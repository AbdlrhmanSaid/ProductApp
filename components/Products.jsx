"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { Alert } from "@mui/material";
import SpeedDial from "@/components/SpeedDial";
import Card from "./Card";
import Categories from "./Categories";
import DialogWindow from "./Dialog";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  return (
    <div>
      <SpeedDial />
      <input
        type="search"
        placeholder="بحث"
        className="p-3 w-[100%] md:w-[70%] rounded shadow-lg my-3"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Categories
        setSearch={setSearch}
        uniqueCategories={uniqueCategories}
        search={search}
      />
      <div
        className={`${loading ? "" : "grid grid-cols-1 md:grid-cols-3 gap-4"}`}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card
                  product={product}
                  key={product._id}
                  handleOpen={handleOpen}
                />
              ))
            ) : (
              <Alert severity="info">لا يوجد منتجات</Alert>
            )}
          </>
        )}
      </div>
      <DialogWindow
        deleteFunc={deleteProduct}
        open={open}
        handleClose={handleClose}
        msg="هل انت متأكد من حذف المنتج؟"
      />
    </div>
  );
}
