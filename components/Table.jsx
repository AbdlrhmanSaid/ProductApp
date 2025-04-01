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
        <div className="min-w-full overflow-hidden">
          <div className="bg-gray-200 rounded-t-lg grid grid-cols-12 p-3 hidden md:grid">
            <div className="col-span-3 font-semibold text-left">Username</div>
            <div className="col-span-4 font-semibold text-left">Email</div>
            <div className="col-span-3 font-semibold text-left">Position</div>
            <div className="col-span-2 font-semibold text-center">Actions</div>
          </div>
          
          <div className="divide-y">
            {users.map((user) => (
              <div 
                key={user._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 hover:bg-gray-100 transition duration-200"
              >
                {/* Mobile View */}
                <div className="md:hidden flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 bg-blue-100 p-2 rounded-full">
                      <FaUser />
                    </span>
                    <span className="font-semibold">{user.username}</span>
                  </div>
                  <div className="text-sm text-gray-500">{user.position || "N/A"}</div>
                </div>
                
                <div className="md:hidden text-sm text-gray-700 mb-2">{user.email}</div>
                
                {/* Desktop View */}
                <div className="hidden md:flex items-center col-span-3">
                  <span className="text-blue-600 bg-blue-100 p-2 rounded-full mr-2">
                    <FaUser />
                  </span>
                  <span>{user.username}</span>
                </div>
                
                <div className="hidden md:flex items-center col-span-4">
                  {user.email}
                </div>
                
                <div className="hidden md:flex items-center col-span-3">
                  {user.position || "N/A"}
                </div>
                
                <div className="flex md:justify-center items-center col-span-12 md:col-span-2 space-x-2 mt-2 md:mt-0">
                  {position === "owner" && (
                    <>
                      <button
                        className="bg-[#e5e7eba1] hover:text-blue-600 p-2 rounded-lg transition duration-200"
                        onClick={() => router.push(`/edit-user?userId=${user._id}`)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="bg-[#e5e7eba1] hover:text-red-600 p-2 rounded-lg transition duration-200"
                        onClick={() => confirmDelete(user._id)}
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : users && users.length === 0 ? (
        <p className="text-center p-5 text-gray-500">No users available</p>
      ) : (
        <Loading title={"Loading Table..."} />
      )}
    </div>
  );
};

export default Table;