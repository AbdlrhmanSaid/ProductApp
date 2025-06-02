"use client";

import { useEffect, useState } from "react";
const useStands = () => {
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStands = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/stands`
        );
        const data = await res.json();
        setStands(data);
      } catch (error) {
        console.error("Error fetching stands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStands();
  }, []);
  return { stands, loading };
};

export default useStands;
