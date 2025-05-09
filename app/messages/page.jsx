"use client";
import React from "react";
import CheckAuth from "@/auth/checkAuth";
import Messages from "@/components/Messages";
import NotAdmin from "@/auth/NotAdmin";
import NavPage from "@/components/NavPage";

const MessagesPage = () => {
  return (
    <CheckAuth>
      <NotAdmin>
        <NavPage link={"الاشعارات"} next={true} />
        <Messages />
      </NotAdmin>
    </CheckAuth>
  );
};

export default MessagesPage;
