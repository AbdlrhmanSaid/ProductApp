"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const AddUserForm = () => {
  const baseUrl = "https://nodeproject-production-dc03.up.railway.app";
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "normal", // القيمة الافتراضية
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // التحقق من تطابق كلمة المرور مع تأكيدها
    if (formData.password !== formData.confirmPassword) {
      setError("Password and confirmation do not match.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        position: formData.position,
      };
      await axios.post(`${baseUrl}/postUser`, newUser);
      setLoading(false);
      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating user.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-5 bg-white p-5 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Add New User</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        {/* حقل اختيار المنصب باللغة الإنجليزية */}
        <div className="mb-4">
          <label className="block mb-1">Position:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="normal">normal</option>
            <option value="owner">owner</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? <Spinner /> : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
