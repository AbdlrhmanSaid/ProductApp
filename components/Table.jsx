import React from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

const Table = ({ users, confirmDelete, position }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      {users ? (
        <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
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
                <td className="border p-3">{user.username}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3">{user.position || "N/A"}</td>
                <td className="border p-3 flex items-center justify-center space-x-2">
                  {position === "owner" && (
                    <>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                        onClick={() =>
                          router.push(`/edit-user?userId=${user._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
                        onClick={() => confirmDelete(user._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading title={"الجدول"} />
      )}
    </div>
  );
};

export default Table;
