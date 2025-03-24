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
        <table className="w-full border shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3 text-left">Username</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Position</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className=" p-3 flex items-center gap-2">
                  <span className="text-blue-600 bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition duration-300">
                    <FaUser />
                  </span>
                  <span>{user.username}</span>
                </td>
                <td className=" p-3">{user.email}</td>
                <td className=" p-3">{user.position || "N/A"}</td>
                <td className=" p-3 flex items-center justify-center space-x-2">
                  {position === "owner" && (
                    <>
                      <button
                        className="bg-[#e5e7eba1] hover:text-blue-600 px-4 py-2 rounded-lg transition duration-200"
                        onClick={() =>
                          router.push(`/edit-user?userId=${user._id}`)
                        }
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="bg-[#e5e7eba1] hover:text-red-600 px-4 py-2 rounded-lg transition duration-200"
                        onClick={() => confirmDelete(user._id)}
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : users && users.length === 0 ? (
        <p className="text-center p-5 text-gray-500">No users available</p>
      ) : (
        <Loading title={"Loading Table..."} />
      )}
    </div>
  );
};

export default Table;
