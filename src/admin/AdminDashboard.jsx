import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ShoppingCart, Package } from "lucide-react";

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

  return (
    <div className="w-screen min-h-screen bg-gray-50 p-6 text-black">
      {/* رأس الصفحة */}
      <header className="bg-white shadow-md rounded-xl p-6 mb-8 text-center flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          {/* 🔹 تاج أنيق يدل على عضمة الأدمن */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-yellow-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l3 7h7l-5.5 4.5 2 7-6-4-6 4 2-7L2 9h7l3-7z" />
          </svg>

          <div className="text-4xl font-bold text-gray-800">Admin Dashboard</div>
        </div>
        <div className="text-xl text-gray-600">Welcome, Admin!</div>
      </header>

      {/* البطاقات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* إدارة المستخدمين */}
        <div
          className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-md cursor-pointer text-center hover:shadow-xl transform hover:-translate-y-1 transition-all"
          onClick={() => navigate("/admin/users")}
        >
          <Users size={48} className="mx-auto text-blue-700 mb-3" />
          <div className="text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-900">
            Manage Users
          </div>
        </div>

        {/* إدارة المنتجات */}
        <div
          className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl shadow-md cursor-pointer text-center hover:shadow-xl transform hover:-translate-y-1 transition-all"
          onClick={() => navigate("/admin/products")}
        >
          <ShoppingCart size={48} className="mx-auto text-green-700 mb-3" />
          <div className="text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-green-900">
            Manage Products
          </div>
        </div>

        {/* إدارة الطلبات */}
        <div
          className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl shadow-md cursor-pointer text-center hover:shadow-xl transform hover:-translate-y-1 transition-all"
          onClick={() => navigate("/admin/orders")}
        >
          <Package size={48} className="mx-auto text-purple-700 mb-3" />
          <div className="text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-purple-900">
            Manage Orders
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
