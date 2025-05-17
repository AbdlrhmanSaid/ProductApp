"use client";

import { MdOutlineInventory2 } from "react-icons/md";
import { useEffect, useRef } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useStands from "@/hooks/useStands";
import NavPage from "@/components/NavPage";
import Loading from "@/components/Loading";
import Link from "next/link";
import CheckAuth from "@/auth/checkAuth";
import sendMessage from "@/utils/sendMessage";

const Stands = () => {
  const { stands, loading, error } = useStands();
  const prevStandsRef = useRef();

  useEffect(() => {
    if (prevStandsRef.current) {
      stands.forEach((stand, index) => {
        if (
          stand.currentProductCount !==
            prevStandsRef.current[index]?.currentProductCount &&
          stand.currentProductCount > stand.maxCapacity &&
          stand.maxCapacity !== undefined
        ) {
          sendMessage({
            user: "stand",
            action: "Over load",
            info: `المخزن : ${stand.standName} ممتلئ عن الحد المسموح به`,
          });
        }
      });
    }

    prevStandsRef.current = stands;
  }, [stands]);

  if (loading) {
    return <Loading title={"جاري تحميل المخازن"} />;
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded shadow-sm">
        <h1 className="text-xl font-bold mb-4">المخازن</h1>
        <div className="text-red-500 p-4 bg-red-50 rounded">
          حدث خطأ أثناء جلب بيانات المخازن: {error.message}
        </div>
      </div>
    );
  }

  const handleDelete = async (standID) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المخزن؟")) {
      try {
        await deleteStand(standID);
      } catch (error) {
        console.error("Error deleting stand:", error);
      }
    }
  };

  return (
    <CheckAuth>
      <NavPage link={"المخازن"} next={true} />
      <div className="bg-white p-4 rounded shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">المخازن</h1>
        </div>

        {stands.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            لا توجد مخازن مسجلة بعد
          </div>
        ) : (
          <div className="stands grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stands.map((stand) => (
              <div
                key={stand.standID}
                className={`border rounded-lg p-4 shadow-md transition hover:shadow-lg ${
                  stand.isActive ? "bg-[#EFF6FF]" : "bg-gray-100"
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <MdOutlineInventory2 className="text-4xl text-blue-600" />
                      <div className="flex gap-2">
                        <Link
                          href={`/stands/edit/${stand._id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiEdit size={18} />
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(stand.standID)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <h2 className="text-lg font-semibold mb-2">
                      {stand.standName}
                    </h2>

                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">الحالة:</span>
                        <span
                          className={
                            stand.isActive
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          {stand.isActive ? "نشط" : "غير نشط"}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">السعة:</span>
                        <span className="font-medium">
                          {stand.currentProductCount || 0}/
                          {stand.maxCapacity || "∞"}
                        </span>
                      </p>

                      <p className="flex justify-between">
                        <span className="text-gray-600">التخزين:</span>
                        <span
                          className={
                            stand.isFull
                              ? "text-red-600 font-medium"
                              : "text-green-600 font-medium"
                          }
                        >
                          {stand.isFull ? "ممتلئ" : "متاح"}
                        </span>
                      </p>

                      {stand.productSpacing && (
                        <p className="flex justify-between">
                          <span className="text-gray-600">
                            المسافة بين المنتجات:
                          </span>
                          <span className="font-medium">
                            {stand.productSpacing} سم
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CheckAuth>
  );
};

export default Stands;
