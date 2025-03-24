"use client";

import CheckAuth from "@/auth/checkAuth";
import UsersTable from "@/components/UsersTable";
import NotAdmin from "@/auth/notAdmin";
import NavPage from "@/components/NavPage";

const UsersPage = () => {
  return (
    <CheckAuth>
      <NotAdmin>
        <NavPage link={"المستخدمون"} next={true} />
        <UsersTable />
      </NotAdmin>
    </CheckAuth>
  );
};

export default UsersPage;
