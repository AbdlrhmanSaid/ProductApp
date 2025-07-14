"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import sendMessage from "@/utils/sendMessage";

const baseUrls = [
  process.env.NEXT_PUBLIC_URL_API,
  process.env.NEXT_SECPUBLIC_URL_API,
];

const useEditUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { userData } = useSelector((state) => state.user);

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
      setLoading(true);
      try {
        let success = false;
        let response;

        for (const url of baseUrls) {
          try {
            response = await axios.get(`${url}/api/users/${userId}`);
            success = true;
            break;
          } catch (err) {
            continue;
          }
        }

        if (!success) throw new Error("فشل في جلب بيانات المستخدم");

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
  }, [userId]);

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

      setLoading(true);
      try {
        let success = false;

        for (const url of baseUrls) {
          try {
            const response = await axios.patch(
              `${url}/api/users/${userId}`,
              formData
            );

            await sendMessage({
              user: userData.username,
              action: "تحديث مستخدم",
              info: `${userData.email} اسم المستخدم ${formData.username}`,
            });

            if (response.status === 200) {
              router.push("/");
              success = true;
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (!success) {
          throw new Error("فشل في تحديث المستخدم");
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
    [formData, initialData, userId, router, userData]
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
