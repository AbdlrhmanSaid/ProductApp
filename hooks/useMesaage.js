"use client";
import { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = "https://nodeproject-production-dc03.up.railway.app";

const useMesaage = () => {
  const [message, setMessage] = useState({ messages: [] });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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

    getMessages();
  }, []);

  return {
    message,
    loading,
  };
};

export default useMesaage;
