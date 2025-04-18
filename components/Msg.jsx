import React from "react";
import { FaUser, FaClock, FaInfoCircle } from "react-icons/fa";

const Msg = ({ msg }) => {
  const formattedTime = new Date(msg.time).toLocaleString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#1976D2] min-h-[120px] w-full flex flex-col justify-between">
      <div>
        <p className="text-lg font-semibold flex items-center gap-2">
          <FaUser className="text-[#1976D2] flex-shrink-0" />
          <span className="truncate">{msg.user}</span>
        </p>

        <p className="text-gray-600 flex items-center gap-2 mt-2">
          <FaInfoCircle className="text-[#F59E0B] flex-shrink-0" />
          <span className="break-words">
            {msg.action.toLowerCase() === "increase"
              ? "زياده في الوزن"
              : msg.action.toLowerCase() === "decrease"
              ? "نقص في الوزن"
              : msg.action}
            -{" "}
            {msg.info == Number(msg.info)
              ? msg.info / 1000 + " كيلو"
              : msg.info}
          </span>
        </p>
      </div>

      <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
        <FaClock className="text-[#6B7280] flex-shrink-0" />
        <span className="truncate">{formattedTime}</span>
      </p>
    </div>
  );
};

export default Msg;