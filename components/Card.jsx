import Link from "next/link";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiCategory } from "react-icons/bi";

export default function ProductCard({ product, handleOpen }) {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded cursor-pointer"
      />

      <h2 className="text-xl font-bold mt-2">{product.title}</h2>
      <p className="text-green-600 font-bold flex items-center gap-1">
        <HiOutlineCurrencyDollar />
        <span>{product.price}</span>
      </p>
      <p className="text-gray-600 gap-1">
        <span> الكمية : {product.quantity}</span>
      </p>
      <h1 className="text-gray-500 flex items-center gap-1 font-bold text-xl">
        <BiCategory />
        <span>{product.category}</span>
      </h1>

      <div className="flex justify-between mt-3">
        <button
          onClick={() => handleOpen(product)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          <MdDelete />
        </button>

        <Link href={`product/${product._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Visit
          </button>
        </Link>
        <Link href={`/edit-product/${product._id}`}>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            <MdEdit />
          </button>
        </Link>
      </div>
    </div>
  );
}
