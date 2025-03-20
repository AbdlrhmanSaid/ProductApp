"use client";
import { useEffect, Suspense, lazy } from "react";
import SpeedDial from "@/components/SpeedDial";
import Loading from "./Loading";
import useProducts from "../hooks/useProducts";
import AlertMsg from "./AlertMsg";

const Card = lazy(() => import("./Card"));
const Categories = lazy(() => import("./Categories"));
const DialogWindow = lazy(() => import("./Dialog"));

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
    position,
  } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4" id="products">
      {position === "owner" && <SpeedDial />}

      <div className="flex justify-center mb-6">
        <input
          type="search"
          placeholder="بحث عن منتج..."
          className="w-full md:w-3/4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            <Categories
              setSearch={setSearch}
              uniqueCategories={uniqueCategories}
              search={search}
            />
          </Suspense>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  product={product}
                  handleOpen={handleOpen}
                  position={position}
                />
              ))}
            </div>
          ) : (
            <AlertMsg msg="لم يتم العثور على منتجات." />
          )}

          {open && (
            <Suspense fallback={<Loading />}>
              <DialogWindow
                deleteFunc={deleteProduct}
                open={open}
                handleClose={handleClose}
                msg="هل أنت متأكد من حذف المنتج؟"
              />
            </Suspense>
          )}
        </>
      )}
    </div>
  );
}
