import Image from "next/image";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import { RiErrorWarningFill } from "react-icons/ri";

export default function ProductCard({ product, handleOpen, position }) {
  const isAdminOrOwner = position === "admin" || position === "owner";
  const isOutOfStock = product.quantity === 0;

  function isValidImage(src) {
    if (!src) return false;
    try {
      new URL(src);
      return true;
    } catch {
      return src.startsWith("/") || src.startsWith("./");
    }
  }

  return (
    <div
      className={`relative border ${
        isOutOfStock ? "border-red-500" : "border-gray-200"
      } p-4 rounded-lg shadow-md bg-white transition-all hover:shadow-lg overflow-hidden`}
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
            priority={true}
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
            {product.title}
          </span>
        )}
      </div>

      <div className="flex justify-between mt-3 gap-2">
        <div className="info">
          <h2
            className={`text-xl font-bold mt-2 ${
              isOutOfStock ? "text-gray-500" : "text-gray-800"
            }`}
          >
            {product.title}
          </h2>

          <p
            className={`flex items-center gap-1 ${
              isOutOfStock ? "text-red-500 font-bold" : "text-gray-600"
            }`}
          >
            الكمية: {product.quantity}
            {isOutOfStock && <RiErrorWarningFill className="text-red-500" />}
          </p>

          <div className="text-gray-500 flex items-center gap-1 font-bold text-lg mt-1">
            <BiCategory />
            <span>{product.category}</span>
          </div>

          <p
            className={`flex items-center gap-1 mt-1 ${
              isOutOfStock ? "text-gray-400" : "text-green-600 font-bold"
            }`}
          >
            <HiOutlineCurrencyDollar />
            <span>{product.price} $</span>
          </p>
        </div>

        <div className="btns flex flex-col justify-between mt-3 gap-2">
          <Link
            href={`/products/product/${product._id}`}
            className={`text-white px-4 py-2 rounded transition flex justify-center items-center bg-blue-600 hover:bg-blue-700`}
            aria-label={`زيارة صفحة المنتج ${product.title}`}
          >
            <FaRegEye />
          </Link>

          {isAdminOrOwner && (
            <>
              <Link
                href={`/products/edit-product/${product._id}`}
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition flex justify-center items-center"
                aria-label="تعديل المنتج"
              >
                <MdEdit size={20} />
              </Link>
              <button
                onClick={() => handleOpen(product)}
                className="text-red-600 bg-red-100 hover:bg-red-200 px-4 py-2 rounded transition flex justify-center items-center"
                aria-label="حذف المنتج"
              >
                <MdDelete size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
