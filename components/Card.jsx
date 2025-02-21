import React from "react";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import Link from "next/link";
import { MdEdit, MdDelete } from "react-icons/md";
import { BiCategory } from "react-icons/bi";

const Card = ({ product, handleOpen }) => {
  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{product.title}</h2>
      <p className="text-gray-600 flex items-center gap-1">
        <HiOutlineCurrencyDollar />
        <span>{product.price}</span>
      </p>
      <p className="text-gray-600  gap-1">
        <span> الكميه : {product.quantity}</span>
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
        <Link href={`/edit-product/${product._id}`}>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            <MdEdit />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
