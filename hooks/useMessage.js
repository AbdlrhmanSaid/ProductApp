"use client";
import { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = "https://nodeproject-production-dc03.up.railway.app";

const useMessage = () => {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/messages`);
      setMessage(data.messages);
    } catch (err) {
      console.error("❌ خطأ في جلب البيانات:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllMessages = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/messages`);
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
