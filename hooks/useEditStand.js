"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = "https://nodeproject-production-dc03.up.railway.app/api/stands";

const useEditStand = (id) => {
  const router = useRouter();
  const [stand, setStand] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchStand = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("فشل في جلب بيانات المخزن");
        const data = await res.json();
        setStand(data);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل بيانات المخزن.");
      }
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

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStand),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        throw new Error("فشل في تعديل بيانات المخزن");
      }

      alert("تم تعديل بيانات المخزن بنجاح");
      router.push("/stands");
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تعديل المخزن.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { stand, isSubmitting, error, handleChange, handleSubmit };
};

export default useEditStand;
