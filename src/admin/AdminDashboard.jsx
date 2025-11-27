import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const currentUser = user || storedUser;

  // Redirect if not admin
  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (!currentUser?.isAdmin) return null;

  return (
    <div className="w-screen h-screen bg-white p-6 text-black">
      <header className="bg-gray-100 shadow rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
        <p className="text-gray-700 mt-1">Welcome, {currentUser.name || currentUser.email}!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/AdminDashboard/users"
          className="bg-gray-200 text-black p-6 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Manage Users
        </Link>
        <Link
          to="/AdminDashboard/products"
          className="bg-gray-200 text-black p-6 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Manage Products
        </Link>
        <Link
          to="/AdminDashboard/orders"
          className="bg-gray-200 text-black p-6 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Manage Orders
        </Link>
      </div>

      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-black mb-4">Statistics</h2>
        <p className="text-gray-700">You can add dashboard stats here.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;







