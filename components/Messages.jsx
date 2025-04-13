import React from "react";
import useMessage from "@/hooks/useMessage";
import Loading from "./Loading";
import Msg from "./Msg";
import AlertMsg from "./AlertMsg";

const Messages = () => {
  const { message = [], loading, deleteAllMessages } = useMessage();

  const userMsg = [...message].filter((msg) => msg.user !== "stand");
  const standMsg = [...message].filter((msg) => msg.user === "stand");

  return (
    <div
      id="msgs"
      className="container mx-auto mt-5 bg-white p-6 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#1976D2]">
        الاشعارات
      </h1>

      {loading ? (
        <Loading title={"الاشعارات"} />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between mb-4">
            {message.length > 0 && (
              <button
                onClick={deleteAllMessages}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
              >
                مسح جميع الاشعارات
              </button>
            )}
          </div>

          <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#1565C0] border-b-2 pb-2 mb-3">
              اشعارات من المخزن
            </h2>
            <div className="grid gap-3 h-60 overflow-y-auto p-2">
              {standMsg.length > 0 ? (
                standMsg.map((msg) => (
                  <div key={msg._id}>
                    <Msg msg={msg} />
                  </div>
                ))
              ) : (
                <AlertMsg msg="لا توجد اشعارات من المخزن" />
              )}
            </div>
          </div>

          <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#1565C0] border-b-2 pb-2 mb-3">
              اشعارات من المستخدمين
            </h2>
            <div className="grid gap-3 h-60 overflow-y-auto p-2">
              {userMsg.length > 0 ? (
                userMsg.map((msg) => (
                  <div key={msg._id}>
                    <Msg msg={msg} />
                  </div>
                ))
              ) : (
                <AlertMsg msg="لا توجد اشعارات من المستخدمين" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
