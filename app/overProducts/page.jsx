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
      <div className="container mx-auto p-4 min-h-screen">
        <NavPage link={"المنتجات النافذة"} next={true} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            المنتجات النافذة من المخزون
          </h1>
          
          {outOfStockProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                لا توجد منتجات نافذة حالياً
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {outOfStockProducts.map((product) => (
                <div key={product._id} className="mb-4">
                  <Card
                    product={product}
                    handleOpen={handleOpen}
                    position={position}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </NotAdmin>
  );
};

export default OutOfStockPage;