"use client";
import { useEffect, Suspense, lazy, useState } from "react";
import Loading from "./Loading";
import useProducts from "@/hooks/useProducts"; // تأكد من هذا السطر
import AlertMsg from "./AlertMsg";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import NavPage from "./NavPage";

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

  const user = useSelector((state) => state.user.userData);
  const [itsOver, setItsOver] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const hasOutOfStock = filteredProducts?.some(
      (product) => product.quantity === 0
    );
    setItsOver(hasOutOfStock);
  }, [filteredProducts]);

  return (
    <div className="container mx-auto" id="products">
      <NavPage />
      <h1 className="text-3xl font-bold mb-5 flex items-center gap-1">
        <span className="py-3">قائمة المنتجات</span>
      </h1>
      <div className="mb-4 bg-white p-4 rounded-lg shadow-lg">
        <Suspense fallback={<Loading title={"تحميل الفئات"} />}>
          <Categories
            setSearch={setSearch}
            uniqueCategories={uniqueCategories}
            search={search}
          />
          <div className="flex justify-center mb-6">
            <input
              type="search"
              placeholder="بحث عن منتج..."
              className="bg-[#E5E7EB] w-full md:w-3/4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-950"
              onChange={(e) => setSearch(e.target.value)}
              value={search ?? ""}
            />
          </div>
        </Suspense>
      </div>

      {loading ? (
        <Loading title={"تحميل المنتجات"} />
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {user.position !== "normal" && (
            <div className="mb-4">
              <Link href={"/products/overProducts"}>
                {itsOver && (
                  <AlertMsg msg="بعض المنتجات نفذت الكمية" type="warning" />
                )}
              </Link>
            </div>
          )}

          {filteredProducts?.length > 0 ? (
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
            <AlertMsg msg="لم يتم العثور على منتجات." type="info" />
          )}

          {user.position !== "normal" && (
            <div className="text-blue-600 my-6 font-bold">
              <Link
                href="/products/add-product"
                className="flex items-center gap-1 hover:text-blue-700 transition-colors"
              >
                اضافة المزيد من المنتجات
                <span>
                  <FaArrowRightLong />
                </span>
              </Link>
            </div>
          )}

          {open && (
            <Suspense fallback={<Loading title={"تحميل النافذة"} />}>
              <DialogWindow
                deleteFunc={deleteProduct}
                open={open}
                handleClose={handleClose}
                msg="هل أنت متأكد من حذف المنتج؟"
              />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
}
