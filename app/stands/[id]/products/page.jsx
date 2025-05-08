"use client";

import useStandProducts from "@/hooks/useStandProducts";
import Loading from "@/components/Loading";
import StandProductCard from "@/components/StandProductCard";
import CheckAuth from "@/auth/checkAuth";
import NavPage from "@/components/NavPage";

const StandProducts = () => {
  const {
    stand,
    loading,
    error,
    filteredProducts,
    handleAddProduct,
    handleRemoveProduct,
  } = useStandProducts();

  if (loading) return <Loading title="تحميل بيانات الرف" />;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
    <CheckAuth>
      <NavPage link={"المخازن"} next={true} />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          إدارة منتجات الرف: {stand.standName}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isOnStand = stand.productIds.includes(product._id);

            return (
              <StandProductCard
                key={product._id}
                product={product}
                isOnStand={isOnStand}
                onAdd={() => handleAddProduct(product._id)}
                onRemove={() => handleRemoveProduct(product._id)}
              />
            );
          })}
        </div>
      </div>
    </CheckAuth>
  );
};

export default StandProducts;
