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
  const baseUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users`;

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
      setUsers(response.data);
    } catch (error) {
      console.error("خطأ في جلب المستخدمين:", error);
      toast.error("فشل في جلب المستخدمين. حاول مرة أخرى.");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const confirmDelete = useCallback((id) => {
    if (!id) return;
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
      await axios.delete(`${baseUrl}/${userToDelete}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userToDelete)
      );

      try {
        await sendMessage({
          user: user.username,
          action: "حذف مستخدم",
          info: `${user.email}`,
        });
      } catch (logError) {
        console.error("فشل في تسجيل النشاط:", logError);
      }

      handleClose();
    } catch (error) {
      console.error("خطأ في حذف المستخدم:", error);
      toast.error("فشل حذف المستخدم. حاول مرة أخرى.");
    }
  }, [userToDelete, handleClose]);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const lowerCaseSearch = search.toLowerCase().normalize("NFKD");
    return users.filter(
      (user) =>
        user.username
          .toLowerCase()
          .normalize("NFKD")
          .includes(lowerCaseSearch) ||
        user.email.toLowerCase().normalize("NFKD").includes(lowerCaseSearch) ||
        user.position.toLowerCase().normalize("NFKD").includes(lowerCaseSearch)
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
