"use client";

import { MdOutlineInventory2 } from "react-icons/md";
import useStands from "@/hooks/useStands";
import NavPage from "@/components/NavPage";
import Loading from "@/components/Loading";

const Page = () => {
  const { stands, loading } = useStands();
  if (loading) {
    return <Loading title={"جاري تحميل المخازن"} />;
  }
  return (
    <>
      <NavPage link={"المخازن"} next={true} />
      <div className="bg-white p-4 rounded shadow-sm">
        <h1 className="text-xl font-bold mb-4">المخازن</h1>
        <div className="stands flex flex-wrap gap-4 justify-center md:justify-start">
          {stands.map((stand) => (
            <div
              key={stand.standID}
              className="box w-64 border rounded-lg p-4 bg-[#EFF6FF] shadow-md transition hover:shadow-lg"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <MdOutlineInventory2 className="text-4xl text-blue-600 mb-2" />
                <h2 className="text-lg font-semibold">{stand.standName}</h2>

                <p className="text-gray-700">
                  الحالة:{" "}
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

                <p className="text-gray-700">
                  ممتلئ:{" "}
                  <span
                    className={
                      stand.isFull
                        ? "text-red-600 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {stand.isFull ? "نعم" : "لا"}
                  </span>
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  معرف الرف: {stand.standID}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
