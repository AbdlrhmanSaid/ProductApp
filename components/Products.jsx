"use client";
import { useEffect, Suspense, lazy } from "react";
import SpeedDial from "@/components/SpeedDial";
import Loading from "./Loading";
import useProducts from "../hooks/useProducts";
import AlertMsg from "./AlertMsg";

// Lazy Load Components
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
    <div>
      {position === "owner" && <SpeedDial />}

      <input
        type="search"
        placeholder="بحث"
        className="p-3 w-full md:w-3/4 rounded shadow-lg my-3"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <AlertMsg msg="لا يوجد منتجات" />
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
