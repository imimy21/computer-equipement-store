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
    <div className="w-screen h-screen p-6 bg-gray-50 flex flex-col relative text-black">
      {/* Success message */}
      {message && (
        <div className="fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow-lg border border-green-300">
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
            className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={fetchUsers}
          className="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition"
          title="Refresh"
        >
          <RefreshCw size={20} className="text-blue-700" />
        </button>
      </div>

      {/* Users table */}
      <div className="flex-1 overflow-auto w-full">
        <table className="w-full min-w-[600px] border-collapse text-sm bg-white rounded-xl shadow-sm">
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
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* User info */}
                  <td className="p-3">
                    <div className="font-medium text-black">
                      {user.displayName || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Mail size={14} /> {user.email}
                    </div>
                  </td>

                  {/* Role with badge */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "user"
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-gray-200 text-gray-700 border border-gray-300"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
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
      <div className="mt-6 text-sm text-gray-600 text-center">
        Showing <b>{filteredUsers.length}</b> of <b>{users.length}</b> users
      </div>

      {/* Confirmation modal */}
      {confirmDelete.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center border border-gray-200">
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete <b>{confirmDelete.email}</b>?
            </p>
            <div className="flex justify-around">
              {/* زر الحذف مع أيقونة بيضاء */}
     {/* زر الحذف مع أيقونة حمراء بدون خلفية */}
{/* زر الحذف بنفس تصميم زر الإلغاء */}
<button
  onClick={deleteUserConfirmed}
  className="px-5 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center gap-2"
>
  <Trash2 size={18} />
  Delete
</button>

              {/* زر الإلغاء */}
              <button
                onClick={() => setConfirmDelete({ show: false, id: null, email: "" })}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
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
