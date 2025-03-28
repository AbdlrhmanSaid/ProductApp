import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";

const NavPage = ({ link = "", next = false }) => {
  const user = useSelector((state) => state.user.userData);

  if (!user) return null;

  return (
    <div className="mb-3 bg-white text-gray-600 flex flex-nowrap justify-between items-center px-3 py-2 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center gap-1 text-sm sm:text-base whitespace-nowrap">
        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200"
        >
          الرئيسية
        </Link>
        {next && (
          <>
            <span className="text-gray-400">›</span>
            <span className="text-blue-600 font-semibold">{link}</span>
          </>
        )}
      </div>
      <Link
        href={`/profile/${user._id}`}
        className="font-medium text-white bg-blue-600 rounded-md px-2 py-1 flex items-center gap-1 text-sm hover:bg-blue-500 transition-colors"
      >
        <IoPerson className="text-base" />
        <span className="truncate">{user.username}</span>
      </Link>
    </div>
  );
};

export default NavPage;
