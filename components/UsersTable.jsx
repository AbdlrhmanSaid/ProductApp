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
      className="h-screen overflow-hidden container mx-auto px-2 sm:px-4 py-5 bg-white rounded shadow"
      id="users"
    >
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold">قائمة المستخدمين</h1>
        
        <div className="w-full">
          <input
            type="search"
            placeholder="بحث"
            className="p-3 w-full rounded bg-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        
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