"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const useEditUser = () => {
  const baseUrl = "https://nodeproject-production-dc03.up.railway.app";
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    position: "normal",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // جلب بيانات المستخدم
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/getUsers/${userId}`);
      const { username, email, position } = response.data;
      setFormData({ username, email, position: position || "normal" });
    } catch (err) {
      setError("حدث خطأ أثناء جلب بيانات المستخدم.");
    } finally {
      setLoading(false);
    }
  };

  // تحديث بيانات المستخدم
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${baseUrl}/updateUser/${userId}`, formData);
      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء تحديث المستخدم.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId]);

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useEditUser;
