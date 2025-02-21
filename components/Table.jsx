import React from "react";
import { useRouter } from "next/navigation";

const Table = ({ users, confirmDelete }) => {
  const router = useRouter();

  return (
    <>
      {users ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Position</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.position || "N/A"}</td>
                <td className="border p-2 flex items-center justify-center ">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => router.push(`/edit-user?userId=${user._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => confirmDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
};

export default Table;
