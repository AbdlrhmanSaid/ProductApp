"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [search, setSearch] = useState("");

  const baseUrl = "https://nodeproject-production-dc03.up.railway.app";
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getUsers`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserToDelete(null);
  };

  const deleteUser = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`${baseUrl}/deleteUser/${userToDelete}`);
      setUsers(users.filter((user) => user._id !== userToDelete));
      handleClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers =
    search !== ""
      ? users.filter(
          (user) =>
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.position.toLowerCase().includes(search.toLowerCase())
        )
      : users;
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
