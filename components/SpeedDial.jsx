"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IoIosPersonAdd } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

const FloatingButtons = () => {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = useCallback(() => {
    setShowButtons((prev) => !prev);
  }, []);

  const buttons = [
    {
      icon: <IoIosPersonAdd size={20} />,
      label: "اضف مستخدم",
      path: "/add-user",
    },
    {
      icon: <FaCartArrowDown size={20} />,
      label: "اضف منتج",
      path: "/add-product",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3">
      <button
        onClick={toggleButtons}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300"
      >
        <CiMenuKebab size={24} />
      </button>

      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col gap-2"
          >
            {buttons.map((btn, index) => (
              <motion.button
                key={index}
                onClick={() => router.push(btn.path)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingButtons;
