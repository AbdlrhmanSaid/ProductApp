"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const baseUrls = [
  process.env.NEXT_PUBLIC_URL_API,
  process.env.NEXT_SECPUBLIC_URL_API,
];

const useEditStand = (id) => {
  const router = useRouter();
  const [stand, setStand] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchStand = async () => {
      for (const baseUrl of baseUrls) {
        try {
          const res = await fetch(`${baseUrl}/api/stands/${id}`);
          if (!res.ok) throw new Error("رابط غير صالح");

          const data = await res.json();
          setStand(data);
          return; // خروج عند النجاح
        } catch (err) {
          console.warn(`⚠️ محاولة فاشلة من: ${baseUrl}`);
          continue; // جرّب الرابط التالي
        }
      }
      // لو فشلت كل المحاولات
      setError("حدث خطأ أثناء تحميل بيانات المخزن.");
    };

    fetchStand();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStand((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !stand) return;

    setIsSubmitting(true);
    setError("");

    const updatedStand = {
      standName: stand.standName,
      maxCapacity: stand.maxCapacity,
      productSpacing: stand.productSpacing,
    };

    let success = false;

    for (const baseUrl of baseUrls) {
      try {
        const res = await fetch(`${baseUrl}/api/stands/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStand),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("❌ استجابة غير ناجحة:", errorData);
          throw new Error();
        }

        alert("تم تعديل بيانات المخزن بنجاح");
        router.push("/stands");
        success = true;
        break;
      } catch (err) {
        console.warn(`⚠️ فشل التحديث على: ${baseUrl}`);
        continue;
      }
    }

    if (!success) {
      setError("حدث خطأ أثناء تعديل المخزن.");
    }

    setIsSubmitting(false);
  };

  return { stand, isSubmitting, error, handleChange, handleSubmit };
};

export default useEditStand;
