import Image from "next/image";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";

export default function ProductCard({ product, handleOpen, position }) {
  const isAdminOrOwner = position === "admin" || position === "owner";

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg">
      {/* Image or Product Name Placeholder */}
      <div className="w-full h-40 rounded bg-blue-600 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <Image
            width={300}
            height={300}
            src={product.image}
            alt={product.title}
            priority={true}
            className="w-full h-full object-cover cursor-pointer"
          />
        ) : (
          <span className="text-white text-2xl font-bold text-center p-2">
            {product.title}
          </span>
        )}
      </div>

      <div className="flex justify-between mt-3 gap-2">
        <div className="info">
          <h2 className="text-xl font-bold mt-2 text-gray-800">
            {product.title}
          </h2>
          <p className="text-gray-600 mt-1">الكمية: {product.quantity}</p>
          <h1 className="text-gray-500 flex items-center gap-1 font-bold text-lg mt-1">
            <BiCategory />
            <span>{product.category}</span>
          </h1>
          <p className="text-green-600 font-bold flex items-center gap-1 mt-1">
            <HiOutlineCurrencyDollar />
            <span>{product.price} $</span>
          </p>
        </div>
        <div className="btns flex flex-col justify-between mt-3 gap-2">
          <Link
            href={`/product/${product._id}`}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition flex justify-center items-center"
            aria-label={`زيارة صفحة المنتج ${product.title}`}
          >
            <FaRegEye />
          </Link>

          {isAdminOrOwner && (
            <Link
              href={`/edit-product/${product._id}`}
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition flex justify-center items-center"
              aria-label="تعديل المنتج"
            >
              <MdEdit size={20} />
            </Link>
          )}
          {isAdminOrOwner && (
            <button
              onClick={() => handleOpen(product)}
              className="text-red-600 bg-red-100 hover:bg-red-200 px-4 py-2 rounded transition flex justify-center items-center"
              aria-label="حذف المنتج"
            >
              <MdDelete size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}