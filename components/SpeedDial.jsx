"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoIosPersonAdd } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa6";

const FloatingButtons = () => {
  const router = useRouter();

  const buttons = [
    { icon: <IoIosPersonAdd />, label: "اضف مستخدم", path: "/add-user" },
    { icon: <FaCartArrowDown />, label: "اضف منتج", path: "/add-product" },
  ];

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3">
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={() => router.push(btn.path)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
        >
          {btn.icon}
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FloatingButtons;
