"use client";
import { useEffect } from "react";
import SpeedDial from "@/components/SpeedDial";
import Card from "./Card";
import Categories from "./Categories";
import DialogWindow from "./Dialog";
import Loading from "./Loading";
import useProducts from "../api/useProducts";
import AlertMsg from "./AlertMsg";

export default function Products() {
  const {
    loading,
    search,
    setSearch,
    open,
    fetchProducts,
    handleOpen,
    handleClose,
    deleteProduct,
    uniqueCategories,
    filteredProducts,
  } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

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
              <AlertMsg msg={"لا يوجد منتجات"} />
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
