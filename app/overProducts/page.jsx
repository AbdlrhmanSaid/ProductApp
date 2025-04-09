"use client";
import { useEffect } from "react";
import useProducts from "@/hooks/useProducts";
import NotAdmin from "@/auth/NotAdmin";
import Loading from "@/components/Loading";
import Card from "@/components/Card";
import NavPage from "@/components/NavPage";

const OutOfStockPage = () => {
  const { loading, fetchProducts, handleOpen, filteredProducts, position } =
    useProducts();
  const outOfStockProducts = filteredProducts.filter(
    (product) => product.quantity === 0
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <NotAdmin>
      <div className="container mx-auto p-4">
        <NavPage link={"منتجات نفذت"} next={true} />
        <h1 className="text-2xl font-bold mb-6">المنتجات النافذة من المخزون</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {outOfStockProducts.map((product) => (
            <Card
              key={product._id}
              product={product}
              handleOpen={handleOpen}
              position={position}
            />
          ))}
        </div>
      </div>
    </NotAdmin>
  );
};

export default OutOfStockPage;
