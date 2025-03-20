"use client";

import DialogWindow from "./Dialog";
import Table from "./Table";
import useUsers from "@/hooks/useUsers";
import AlertMsg from "./AlertMsg";
import { useSelector } from "react-redux";

const UsersTable = () => {
  const {
    search,
    filteredUsers,
    confirmDelete,
    deleteUser,
    open,
    handleClose,
    setSearch,
  } = useUsers();

  const position = useSelector((state) => state.user.userData?.position);

  if (position !== "admin" && position !== "owner") {
    return;
  }

  return (
    <div
      className="container mx-auto mt-5 bg-white p-3 rounded shadow"
      id="users"
    >
      <h1 className="text-3xl font-bold mb-4">قائمة المستخدمين</h1>
      <input
        type="search"
        placeholder="بحث"
        className="p-3 w-[100%] md:w-[70%] rounded my-3 bg-[#E5E7EB]"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="overflow-x-auto">
        {filteredUsers.length > 0 ? (
          <Table
            position={position}
            users={filteredUsers}
            confirmDelete={confirmDelete}
          />
        ) : (
          <AlertMsg msg={"لا يوجد مستخدمين"} />
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
