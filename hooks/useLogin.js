"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setWrongTime } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import sendMessage from "@/utils/sendMessage";

const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);
  const [user, setUserState] = useState(null);

  const [wrongTime, setLocalWrongTime] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user_data");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserState(parsedUser);
        dispatch(setUser(parsedUser));
      }

      const storedWrongTime = localStorage.getItem("wrongTime");
      if (storedWrongTime) {
        const wrongAttempts = parseInt(storedWrongTime, 10);
        setLocalWrongTime(wrongAttempts);

        if (wrongAttempts >= 3) {
          setIsBlocked(true);
          setCountdown(30);
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (isBlocked && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsBlocked(false);
      setLocalWrongTime(0);
      localStorage.setItem("wrongTime", "0");
    }
  }, [isBlocked, countdown]);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const updateWrongTime = useCallback(() => {
    const newWrongTime = wrongTime + 1;
    setLocalWrongTime(newWrongTime);
    localStorage.setItem("wrongTime", newWrongTime.toString());
    dispatch(setWrongTime(newWrongTime));

    if (newWrongTime >= 3) {
      setIsBlocked(true);
      setCountdown(30);
    }
  }, [wrongTime, dispatch]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isBlocked) return;

      setErrorMessage("");
      setIsLoading(true);

      if (!emailRegex.test(formData.email)) {
        setErrorMessage("يرجى إدخال بريد إلكتروني صالح");
        setIsLoading(false);
        return;
      }

      try {
        const action = "تسجيل دخول";
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

        const match = await bcrypt.compare(
          formData.password,
          userData.password
        );

        if (!match) {
          setErrorMessage("كلمة المرور غير صحيحة");
          updateWrongTime();
          setIsLoading(false);
          return;
        }

        delete userData.password;

        dispatch(setUser(userData));
        if (typeof window !== "undefined") {
          sessionStorage.setItem("user_data", JSON.stringify(userData));
        }

        await sendMessage({
          user: userData.username,
          action: action,
          info: `${userData.email}`,
        });

        router.push("/");
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("حدث خطأ، حاول مرة أخرى لاحقًا.");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, emailRegex, isBlocked, router, dispatch, updateWrongTime]
  );

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
