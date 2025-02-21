"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DialogWindow from "./Dialog";
import Table from "./Table";

const UsersTable = () => {
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

  return (
    <div className="container mx-auto mt-5 bg-white p-3 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">قائمة المستخدمين</h1>
      <input
        type="search"
        placeholder="بحث"
        className="p-3 w-[100%] md:w-[70%] rounded  my-3 bg-[#E5E7EB]"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="overflow-x-auto">
        {filteredUsers.length > 0 ? (
          <Table users={filteredUsers} confirmDelete={confirmDelete} />
        ) : (
          ""
        )}
      </div>
      <DialogWindow
        deleteFunc={deleteUser}
        open={open}
        handleClose={handleClose}
        msg="هل انت متأكد من حذف المستخدم؟"
      />
    </div>
  );
};

export default UsersTable;
