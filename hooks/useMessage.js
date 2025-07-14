"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const getBaseUrls = () => [
  process.env.NEXT_PUBLIC_URL_API,
  process.env.NEXT_PUBLIC_SECPUBLIC_URL_API,
];

const useMessage = () => {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    setLoading(true);
    const [primaryUrl, fallbackUrl] = getBaseUrls();

    try {
      let response;
      try {
        response = await axios.get(`${primaryUrl}/api/messages`);
      } catch (primaryError) {
        // تجربة الرابط الاحتياطي
        response = await axios.get(`${fallbackUrl}/api/messages`);
      }
      setMessage(response.data.messages);
    } catch (err) {
      console.error("❌ خطأ في جلب البيانات:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllMessages = async () => {
    const [primaryUrl, fallbackUrl] = getBaseUrls();

    try {
      try {
        await axios.delete(`${primaryUrl}/api/messages`);
      } catch (primaryError) {
        await axios.delete(`${fallbackUrl}/api/messages`);
      }
      getMessages();
    } catch (err) {
      console.error("❌ خطأ في مسح جميع الرسائل:", err);
    }
  };

  return {
    message,
    loading,
    deleteAllMessages,
  };
};

export default useMessage;
