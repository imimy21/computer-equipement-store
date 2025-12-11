import React, { useState, useEffect } from "react";
import { Search, Trash2, Mail, RefreshCw, Users } from "lucide-react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/";

const AdminUsersShort = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null, email: "" });

  // Fetch users from Firestore
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const usersData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.role !== "admin"); // Hide admins
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Confirm delete user
  const deleteUserConfirmed = async () => {
    const { id, email } = confirmDelete;
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setMessage(`User ${email} has been deleted successfully!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting user:", err);
      setMessage(`Error deleting ${email}.`);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setConfirmDelete({ show: false, id: null, email: "" });
    }
  };

  // Filter users by search
  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-6 text-center">⏳ Loading...</div>;

  return (
    <div className="w-screen h-screen p-6 bg-white flex flex-col relative">
      {/* Success message */}
      {message && (
        <div className="fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow">
          {message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Users size={36} className="text-blue-700" />
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
      </div>

      {/* Search bar */}
      <div className="mb-6 flex gap-2 flex-wrap items-center">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute right-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for a user..."
            className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={fetchUsers}
          className="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg"
          title="Refresh"
        >
          <RefreshCw size={20} className="text-blue-700" />
        </button>
      </div>

      {/* Users table */}
      <div className="flex-1 overflow-auto w-full">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700 sticky top-0">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  {/* User info */}
                  <td className="p-3">
                    <div className="font-medium text-black">{user.displayName || "supreme"}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Mail size={14} /> {user.email}
                    </div>
                  </td>

                  {/* Role */}
                  <td
                    className={`p-3 capitalize ${
                      user.role === "user" ? "text-green-600" : "text-black"
                    }`}
                  >
                    {user.role || "user"}
                  </td>

                  {/* Actions */}
                  <td className="p-3">
                    <button
                      onClick={() =>
                        setConfirmDelete({ show: true, id: user.id, email: user.email })
                      }
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      title="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-500">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* Confirmation modal */}
      {confirmDelete.show && (
        <div className="fixed flex items-center justify-center inset-0 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center border border-gray-300">
            <p className="mb-4">
              Are you sure you want to delete {confirmDelete.email}?
            </p>
            <div className="flex justify-around">
              <button
                onClick={deleteUserConfirmed}
                className="px-4 py-2 bg-red-300 text-black rounded hover:bg-red-400"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete({ show: false, id: null, email: "" })}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersShort;
