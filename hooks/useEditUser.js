"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import sendMessage from "@/utils/sendMessage";

const useEditUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { userData } = useSelector((state) => state.user);

  const baseUrl = useMemo(
    () => `${process.env.NEXT_PUBLIC_URL_API}/api/users`,
    []
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    position: "normal",
  });

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("معرف المستخدم غير موجود.");
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/${userId}`);
        const { username, email, position } = response.data;
        const newData = { username, email, position: position || "normal" };

        setFormData((prevData) =>
          JSON.stringify(prevData) !== JSON.stringify(newData)
            ? newData
            : prevData
        );
        setInitialData(newData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(
          err.response?.data?.message || "حدث خطأ أثناء جلب بيانات المستخدم."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, baseUrl]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!userId) {
        setError("لا يمكن تحديث المستخدم بدون معرف.");
        return;
      }

      if (JSON.stringify(formData) === JSON.stringify(initialData)) {
        setError("لم يتم تغيير أي بيانات.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.patch(`${baseUrl}/${userId}`, formData);
        await sendMessage({
          user: userData.username,
          action: "تحديث مستخدم",
          info: `${userData.email} اسم المستخدم ${formData.username}`,
        });
        if (response.status === 200) {
          router.push("/");
        }
      } catch (err) {
        console.error("Error updating user:", err);
        setError(
          err.response?.data?.message || "حدث خطأ أثناء تحديث المستخدم."
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, initialData, userId, baseUrl, router]
  );

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useEditUser;
