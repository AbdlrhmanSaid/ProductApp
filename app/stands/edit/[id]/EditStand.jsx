"use client";

import useEditStand from "@/hooks/useEditStand";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import sendMessage from "@/utils/sendMessage";

const EditStand = ({ id }) => {
  const { stand, isSubmitting, error, handleChange, handleSubmit } =
    useEditStand(id);

  if (!stand) return <Loading />;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">تعديل بيانات المخزن</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">اسم المخزن</label>
          <input
            type="text"
            name="standName"
            value={stand.standName || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">أقصى سعة</label>
          <input
            type="number"
            name="maxCapacity"
            value={stand.maxCapacity || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            المسافة بين المنتجات (سم)
          </label>
          <input
            type="number"
            name="productSpacing"
            value={stand.productSpacing || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>
      </form>
    </div>
  );
};

export default EditStand;
