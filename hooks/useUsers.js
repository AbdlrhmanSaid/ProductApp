"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import sendMessage from "@/utils/sendMessage";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.user.userData);

  const baseUrl = "https://nodeproject-production-dc03.up.railway.app";

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/getUsers`);
      setUsers(response.data);
    } catch (error) {
      console.error("خطأ في جلب المستخدمين:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const confirmDelete = useCallback((id) => {
    setUserToDelete(id);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setUserToDelete(null);
  }, []);

  const deleteUser = useCallback(async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`${baseUrl}/deleteUser/${userToDelete}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userToDelete)
      );
      await sendMessage({
        user: user.username,
        action: "حذف مستخدم",
        info: `${user.email} `,
      });
      handleClose();
    } catch (error) {
      console.error("خطأ في حذف المستخدم:", error);
    }
  }, [userToDelete, handleClose]);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const lowerCaseSearch = search.toLowerCase();
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseSearch) ||
        user.email.toLowerCase().includes(lowerCaseSearch) ||
        user.position.toLowerCase().includes(lowerCaseSearch)
    );
  }, [search, users]);

  return {
    search,
    setSearch,
    filteredUsers,
    confirmDelete,
    deleteUser,
    open,
    handleClose,
  };
};

export default useUsers;
