import Link from "next/link";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import Image from "next/image";

export default function ProductCard({ product, handleOpen, position }) {
  const isAdminOrOwner = position === "admin" || position === "owner";

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white transition hover:shadow-lg">
      <Image
        width={300}
        height={300}
        src={product.image}
        alt={product.title}
        priority={true}
        className="w-full h-40 object-cover rounded cursor-pointer transition-transform duration-300 hover:scale-105"
      />

      <h2 className="text-xl font-bold mt-2">{product.title}</h2>

      <p className="text-green-600 font-bold flex items-center gap-1">
        <HiOutlineCurrencyDollar />
        <span>{product.price} $</span>
      </p>

      <p className="text-gray-600">الكمية: {product.quantity}</p>

      <h1 className="text-gray-500 flex items-center gap-1 font-bold text-lg">
        <BiCategory />
        <span>{product.category}</span>
      </h1>

      <div className="flex justify-between mt-3 gap-2 flex-wrap">
        {isAdminOrOwner && (
          <button
            onClick={() => handleOpen(product)}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded transition w-[30%] flex justify-center items-center"
            aria-label="حذف المنتج"
          >
            <MdDelete size={20} />
          </button>
        )}

        <Link href={`/product/${product._id}`} className="w-[30%]">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded w-full text-sm transition"
            aria-label={`زيارة صفحة المنتج ${product.title}`}
          >
            زيارة
          </button>
        </Link>

        {isAdminOrOwner && (
          <Link href={`/edit-product/${product._id}`} className="w-[30%]">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded w-full flex justify-center items-center transition"
              aria-label="تعديل المنتج"
            >
              <MdEdit size={20} />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
