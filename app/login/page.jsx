"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://nodeproject-production-dc03.up.railway.app/getUserByEmail",
        { email: formData.email }
      );
      const userData = response.data;

      if (!userData.password) {
        setErrorMessage("User not found");
        setIsLoading(false);
        return;
      }

      const match = await bcrypt.compare(formData.password, userData.password);

      if (!match) {
        setErrorMessage("Incorrect password");
        setIsLoading(false);
        return;
      }

      dispatch(setUser(userData));
      sessionStorage.setItem("user_data", JSON.stringify(userData));
      router.push("/");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 border rounded-lg shadow-lg"
      >
        {errorMessage && (
          <p className="bg-red-800 text-white text-center p-2 rounded-md">
            {errorMessage}
          </p>
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter email"
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter password"
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
