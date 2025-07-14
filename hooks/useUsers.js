"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import sendMessage from "@/utils/sendMessage";
import { toast } from "react-hot-toast"; // تأكد إنه مضاف في مشروعك

const baseUrls = [
  process.env.NEXT_PUBLIC_URL_API,
  process.env.NEXT_SECPUBLIC_URL_API,
].filter(Boolean);

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [search, setSearch] = useState("");

  const user = useSelector((state) => state.user.userData);

  const fetchUsers = useCallback(async () => {
    for (const url of baseUrls) {
      try {
        const response = await axios.get(`${url}/api/users`);
        setUsers(response.data);
        return;
      } catch (error) {
        console.warn(`❌ فشل من ${url}:`, error.message);
        continue;
      }
    }

    toast.error("فشل في جلب المستخدمين. حاول مرة أخرى.");
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

    for (const url of baseUrls) {
      try {
        await axios.delete(`${url}/api/users/${userToDelete}`);
        setUsers((prevUsers) =>
          prevUsers.filter((u) => u._id !== userToDelete)
        );

        try {
          await sendMessage({
            user: user.username,
            action: "حذف مستخدم",
            info: `${user.email}`,
          });
        } catch (logError) {
          console.error("⚠️ فشل تسجيل النشاط:", logError);
        }

        handleClose();
        return;
      } catch (error) {
        console.warn(`❌ فشل حذف من ${url}:`, error.message);
        continue;
      }
    }

    toast.error("فشل حذف المستخدم. حاول مرة أخرى.");
  }, [userToDelete, handleClose, user]);

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    const lower = search.toLowerCase().normalize("NFKD");
    return users.filter(
      (user) =>
        user.username.toLowerCase().normalize("NFKD").includes(lower) ||
        user.email.toLowerCase().normalize("NFKD").includes(lower) ||
        user.position.toLowerCase().normalize("NFKD").includes(lower)
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
