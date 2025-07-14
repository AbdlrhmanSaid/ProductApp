"use client";

import { useEffect, useState } from "react";

const baseUrls = [
  process.env.NEXT_PUBLIC_URL_API,
  process.env.NEXT_SECPUBLIC_URL_API,
];

const useStands = () => {
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStands = async () => {
      setLoading(true);

      let success = false;

      for (const baseUrl of baseUrls) {
        try {
          const res = await fetch(`${baseUrl}/api/stands`);
          if (!res.ok) throw new Error("استجابة غير صالحة");

          const data = await res.json();
          setStands(data);
          success = true;
          break;
        } catch (error) {
          console.warn(`⚠️ فشل من ${baseUrl}:`, error.message);
          continue;
        }
      }

      if (!success) {
        console.error("❌ فشل في جلب بيانات الرفوف من جميع الروابط.");
      }

      setLoading(false);
    };

    fetchStands();
  }, []);

  return { stands, loading };
};

export default useStands;
