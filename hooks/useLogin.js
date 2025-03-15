"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setWrongTime } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);
  const user = userData;

  const [wrongTime, setLocalWrongTime] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  // ✅ تحميل wrongTime من localStorage عند بدء التشغيل
  useEffect(() => {
    const storedWrongTime = localStorage.getItem("wrongTime");
    if (storedWrongTime) {
      setLocalWrongTime(parseInt(storedWrongTime, 10));
    }
  }, []);

  // ✅ عند تجاوز 3 محاولات خاطئة، يتم الحظر
  useEffect(() => {
    if (wrongTime >= 3) {
      setIsBlocked(true);
      setErrorMessage("تم حظر المحاولات لمدة دقيقة بسبب 3 محاولات خاطئة.");

      setTimeout(() => {
        setLocalWrongTime(0);
        localStorage.setItem("wrongTime", "0");
        setIsBlocked(false);
        setErrorMessage("");
      }, 60000);
    }
  }, [wrongTime]);

  // ✅ إذا كان المستخدم مسجل دخول، انتقل إلى الصفحة الرئيسية
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) return;

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://nodeproject-production-dc03.up.railway.app/getUserByEmail",
        { email: formData.email }
      );
      const userData = response.data;

      if (!userData.password) {
        setErrorMessage("المستخدم غير موجود");
        updateWrongTime();
        return;
      }

      const match = await bcrypt.compare(formData.password, userData.password);

      if (!match) {
        setErrorMessage("كلمة المرور غير صحيحة");
        updateWrongTime();
        return;
      }

      dispatch(setUser(userData));
      sessionStorage.setItem("user_data", JSON.stringify(userData));
      router.push("/");
    } catch (error) {
      setErrorMessage("حدث خطأ، حاول مرة أخرى لاحقًا.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateWrongTime = () => {
    const newWrongTime = wrongTime + 1;
    setLocalWrongTime(newWrongTime);
    localStorage.setItem("wrongTime", newWrongTime.toString());
    dispatch(setWrongTime(newWrongTime));
  };

  return {
    user,
    formData,
    errorMessage,
    isLoading,
    isBlocked,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
