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
  const user = userData || JSON.parse(sessionStorage.getItem("user_data"));

  const [wrongTime, setLocalWrongTime] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const storedWrongTime = localStorage.getItem("wrongTime");
    if (storedWrongTime) {
      setLocalWrongTime(parseInt(storedWrongTime, 10));
    }
  }, []);

  useEffect(() => {
    if (wrongTime >= 3) {
      setIsBlocked(true);
      setErrorMessage("تم حظر المحاولات لمدة 30 ثانية بسبب 3 محاولات خاطئة.");
      setCountdown(30);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsBlocked(false);
            setLocalWrongTime(0);
            localStorage.setItem("wrongTime", "0");
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [wrongTime]);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      router.push("/");
    }
  }, [user, router, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) return;

    setErrorMessage("");
    setIsLoading(true);

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("يرجى إدخال بريد إلكتروني صالح");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://nodeproject-production-dc03.up.railway.app/getUserByEmail",
        { email: formData.email }
      );
      const userData = response.data;

      if (!userData.password) {
        setErrorMessage("المستخدم غير موجود");
        updateWrongTime();
        setIsLoading(false);
        return;
      }

      const match = await bcrypt.compare(formData.password, userData.password);

      if (!match) {
        setErrorMessage("كلمة المرور غير صحيحة");
        updateWrongTime();
        setIsLoading(false);
        return;
      }

      // حذف كلمة المرور قبل تخزين البيانات
      delete userData.password;

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
    countdown,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
