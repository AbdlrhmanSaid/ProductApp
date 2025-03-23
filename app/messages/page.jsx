"use client";
import React from "react";
import useMessage from "@/hooks/useMessage";
import Loading from "@/components/Loading";
import Msg from "@/components/Msg";
import AlertMsg from "@/components/AlertMsg";
import CheckAuth from "@/auth/checkAuth";

const Messages = () => {
  const { message = [], loading } = useMessage();
  const userMsg = message.reverse().filter((msg) => msg.user !== "stand");
  const standMsg = message.reverse().filter((msg) => msg.user === "stand");

  return (
    <CheckAuth>
      <div
        id="msgs"
        className="container mx-auto mt-5 bg-white p-6 rounded-lg shadow-lg "
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-[#1976D2]">
          الاشعارات
        </h1>

        {loading ? (
          <Loading title={"الاشعارات"} />
        ) : (
          <div className="flex flex-col  gap-6">
            <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-[#1565C0] border-b-2 pb-2 mb-3">
                اشعارات من المخزن
              </h2>
              <div className="space-y-3 h-80 overflow-y-auto p-2">
                {standMsg.length > 0 ? (
                  standMsg.map((msg) => <Msg key={msg._id} msg={msg} />)
                ) : (
                  <AlertMsg msg="لا توجد رسائل من المخزن" />
                )}
              </div>
            </div>
            <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-[#1565C0] border-b-2 pb-2 mb-3">
                اشعارات من المستخدمين
              </h2>
              <div className="space-y-3 h-80 overflow-y-auto p-2">
                {userMsg.length > 0 ? (
                  userMsg.map((msg) => <Msg key={msg._id} msg={msg} />)
                ) : (
                  <AlertMsg msg="لا توجد اشعارات من المستخدمين" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </CheckAuth>
  );
};

export default Messages;
