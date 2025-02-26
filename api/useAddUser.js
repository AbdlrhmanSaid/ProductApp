"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import bcrypt from "bcryptjs";

const useAddUser = () => {
  const baseUrl = "https://nodeproject-production-dc03.up.railway.app";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("كلمة المرور وتأكيد كلمة المرور غير متطابقين.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

      const newUser = {
        username: formData.username,
        email: formData.email,
        password: hashedPassword,
        position: formData.position,
      };

      await axios.post(`${baseUrl}/postUser`, newUser);

      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء إنشاء المستخدم.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useAddUser;
