"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import Loading from "@/components/Loading";

const EditUserForm = () => {
  const baseUrl = "https://nodeproject-production-dc03.up.railway.app";
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("userId");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    position: "normal", // القيمة الافتراضية
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/getUsers/${userId}`);
      const { username, email, position } = response.data;
      setFormData({ username, email, position: position || "normal" });
      setLoading(false);
    } catch (err) {
      setError("An error occurred while fetching the user data.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updateData = {
        username: formData.username,
        email: formData.email,
        position: formData.position,
      };
      await axios.patch(`${baseUrl}/updateUser/${userId}`, updateData);
      setLoading(false);
      router.push("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while updating the user."
      );
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto mt-5 bg-white p-5 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Edit User Details</h1>
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
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? <Spinner /> : "تحديث المستخدم"}
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
