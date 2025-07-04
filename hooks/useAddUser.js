"use client";
import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import sendMessage from "@/utils/sendMessage";

const useAddUser = () => {
  const baseUrl = useMemo(
    () => `${process.env.NEXT_PUBLIC_URL_API}/api/users`,
    []
  );
  const { userData } = useSelector((state) => state.user);

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "normal",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const validateForm = useCallback(() => {
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("يجب ملء جميع الحقول.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("كلمة المرور وتأكيد كلمة المرور غير متطابقين.");
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      try {
        setLoading(true);
        setError("");

        const { username, email, password, position } = formData;

        await axios.post(`${baseUrl}`, {
          username,
          email,
          password,
          position,
        });
        await sendMessage({
          user: userData.username,
          action: "اضافة مستخدم",
          info: `${userData.email}`,
        });

        router.push("/");
      } catch (err) {
        setError(
          err.response?.data?.message || "حدث خطأ أثناء إنشاء المستخدم."
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, baseUrl, router, validateForm]
  );

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useAddUser;
