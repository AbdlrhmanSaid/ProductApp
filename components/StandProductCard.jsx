import Image from "next/image";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";
import { RiErrorWarningFill } from "react-icons/ri";

const isValidImage = (src) => {
  if (!src) return false;
  try {
    new URL(src);
    return true;
  } catch {
    return src.startsWith("/") || src.startsWith("./");
  }
};

export default function StandProductCard({
  product,
  isOnStand,
  onAdd,
  onRemove,
}) {
  const isOutOfStock = product.quantity === 0;

  return (
    <div
      className={`relative border ${
        isOutOfStock ? "border-red-500" : "border-gray-200"
      } p-4 rounded-lg shadow-md bg-white transition hover:shadow-lg overflow-hidden`}
    >
      {isOutOfStock && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-1 text-sm font-bold flex items-center justify-center">
          <RiErrorWarningFill className="mr-1" />
          <span>نفذت الكمية</span>
        </div>
      )}

      <div
        className={`w-full h-40 rounded ${
          isOutOfStock ? "bg-gray-100 mt-4" : "bg-blue-50"
        } flex items-center justify-center overflow-hidden`}
      >
        {product?.image && isValidImage(product.image) ? (
          <Image
            width={300}
            height={300}
            src={product.image}
            alt={product?.title}
            priority
            className={`w-full h-full object-cover ${
              isOutOfStock ? "opacity-70" : ""
            }`}
          />
        ) : (
          <span
            className={`text-2xl font-bold text-center p-2 ${
              isOutOfStock ? "text-gray-500" : "text-blue-600"
            }`}
          >
            {product.title || product.productName}
          </span>
        )}
      </div>

      <div className="mt-3 space-y-2">
        <h2
          className={`text-xl font-bold ${
            isOutOfStock ? "text-gray-500" : "text-gray-800"
          }`}
        >
          {product.title || product.productName}
        </h2>

        <p
          className={`flex items-center gap-1 ${
            isOutOfStock ? "text-red-500 font-bold" : "text-gray-600"
          }`}
        >
          الكمية: {product.quantity}
          {isOutOfStock && <RiErrorWarningFill className="text-red-500" />}
        </p>

        <p className="text-gray-500 flex items-center gap-1">
          <BiCategory />
          <span>{product.category}</span>
        </p>

        <p
          className={`flex items-center gap-1 ${
            isOutOfStock ? "text-gray-400" : "text-green-600 font-bold"
          }`}
        >
          <HiOutlineCurrencyDollar />
          <span>{product.price} $</span>
        </p>

        <button
          onClick={isOnStand ? onRemove : onAdd}
          className={`w-full text-white py-2 mt-2 rounded transition ${
            isOnStand
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isOnStand ? "إزالة من الرف" : "إضافة إلى الرف"}
        </button>
      </div>
    </div>
  );
}
