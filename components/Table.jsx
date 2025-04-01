import React from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { FaUser } from "react-icons/fa";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";

const Table = ({ users, confirmDelete, position }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      {users && users.length > 0 ? (
        <div className="min-w-full">
          {/* Header for Desktop */}
          <div className="bg-gray-200 rounded-t-lg hidden md:grid grid-cols-12 p-3">
            <div className="col-span-4 font-semibold text-right">اسم المستخدم</div>
            <div className="col-span-4 font-semibold text-right">البريد الإلكتروني</div>
            <div className="col-span-2 font-semibold text-right">الصلاحية</div>
            <div className="col-span-2 font-semibold text-center">الإجراءات</div>
          </div>
          
          {/* Users List */}
          <div className="divide-y border rounded-lg md:rounded-t-none">
            {users.map((user) => (
              <div 
                key={user._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 hover:bg-gray-50 transition duration-200"
              >
                {/* Mobile View */}
                <div className="md:hidden space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 bg-blue-100 p-2 rounded-full">
                        <FaUser />
                      </span>
                      <span className="font-medium">{user.username || 'بدون اسم'}</span>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {user.position || "N/A"}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600 truncate max-w-[180px]">
                      {user.email}
                    </div>
                    
                    {position === "owner" && (
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button
                          className="bg-gray-100 hover:text-blue-600 p-1.5 rounded-lg transition"
                          onClick={() => router.push(`/edit-user?userId=${user._id}`)}
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          className="bg-gray-100 hover:text-red-600 p-1.5 rounded-lg transition"
                          onClick={() => confirmDelete(user._id)}
                        >
                          <MdOutlineDeleteOutline size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Desktop View */}
                <div className="hidden md:flex items-center col-span-4 text-right">
                  <span className="text-blue-600 bg-blue-100 p-2 rounded-full ml-2">
                    <FaUser size={14} />
                  </span>
                  <span className="truncate">{user.username || 'بدون اسم'}</span>
                </div>
                
                <div className="hidden md:flex items-center col-span-4 text-right text-sm text-gray-700 truncate">
                  {user.email}
                </div>
                
                <div className="hidden md:flex items-center col-span-2 text-right text-sm">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {user.position || "N/A"}
                  </span>
                </div>
                
                <div className="hidden md:flex justify-center items-center col-span-2 space-x-2 rtl:space-x-reverse">
                  {position === "owner" && (
                    <>
                      <button
                        className="bg-gray-100 hover:text-blue-600 p-2 rounded-lg transition"
                        onClick={() => router.push(`/edit-user?userId=${user._id}`)}
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        className="bg-gray-100 hover:text-red-600 p-2 rounded-lg transition"
                        onClick={() => confirmDelete(user._id)}
                      >
                        <MdOutlineDeleteOutline size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : users && users.length === 0 ? (
        <p className="text-center p-5 text-gray-500">لا يوجد مستخدمين</p>
      ) : (
        <Loading title={"جاري التحميل..."} />
      )}
    </div>
  );
};

export default Table;