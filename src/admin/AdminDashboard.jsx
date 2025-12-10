import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const currentUser = user || storedUser;

  useEffect(() => {
    if (!currentUser) return;
    if (!currentUser.role) return;

    if (currentUser.role !== "admin") {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [currentUser, navigate]);

  if (loading || !currentUser || !currentUser.role) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }

  const handleClick = (section) => {
    alert(`${section} page is coming soon!`);
  };

  return (
    <div className="w-screen h-screen bg-white p-6 text-black">
      <header className="bg-gray-100 shadow rounded-lg p-6 mb-6 text-center">
        <div className="text-3xl font-bold text-black mb-2">Admin Dashboard</div>
        <div className="text-xl text-gray-700">Welcome Admin</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="bg-gray-200 text-black p-6 rounded-lg shadow cursor-pointer text-center hover:bg-gray-300"
          onClick={() => handleClick("Manage Users")}
        >
          Manage Users
        </div>
        <div
          className="bg-gray-200 text-black p-6 rounded-lg shadow cursor-pointer text-center hover:bg-gray-300"
          onClick={() => handleClick("Manage Products")}
        >
          Manage Products
        </div>
        <div
          className="bg-gray-200 text-black p-6 rounded-lg shadow cursor-pointer text-center hover:bg-gray-300"
          onClick={() => handleClick("Manage Orders")}
        >
          Manage Orders
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;


