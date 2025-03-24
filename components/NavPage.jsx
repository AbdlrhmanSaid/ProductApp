import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";

const NavPage = ({ link = "", next = false }) => {
  const user = useSelector((state) => state.user.userData);

  if (!user) return null;

  return (
    <div className="mb-3 bg-white text-gray-600 flex flex-wrap justify-between items-center px-6 py-3 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200"
        >
          الرئيسية
        </Link>
        {next && (
          <>
            <span className="text-gray-400">{">"}</span>
            <span className="text-blue-600 font-semibold">{link}</span>
          </>
        )}
      </div>
      <Link
        href={`/profile/${user._id}`}
        className="font-medium text-gray-700 flex items-center gap-2  hover:text-blue-600 duration-100"
      >
        <span>
          <IoPerson className="" />
        </span>
        <span>{user.username}</span>
      </Link>
    </div>
  );
};

export default NavPage;
