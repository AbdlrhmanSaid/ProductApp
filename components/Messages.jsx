import React from "react";
import useMesaage from "@/hooks/useMesaage";
import Loading from "./Loading";
import { FaUser, FaClock, FaInfoCircle } from "react-icons/fa";

const Messages = () => {
  const { message, loading } = useMesaage();

  return (
    <div className="container mx-auto mt-5 bg-white p-5 rounded-lg shadow-md max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#1976D2]">
        التفاصيل
      </h1>

      {loading ? (
        <Loading />
      ) : message.length > 0 ? (
        <div className="space-y-4">
          {message.map((msg) => {
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
              <div
                key={msg._id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-[#1976D2]"
              >
                <p className="text-lg font-semibold flex items-center gap-2">
                  <FaUser className="text-[#1976D2]" /> {msg.user}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaInfoCircle className="text-[#F59E0B]" />{" "}
                  {msg.action == "increase"
                    ? "زياده في الوزن"
                    : msg.action == "Decrease"
                    ? "نفص  في الوزن"
                    : msg.action}
                  -{" "}
                  {msg.info == Number(msg.info)
                    ? msg.info / 1000 + " كيلو"
                    : msg.info}
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <FaClock className="text-[#6B7280]" /> {formattedTime}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center">لا توجد رسائل متاحة</p>
      )}
    </div>
  );
};

export default Messages;
