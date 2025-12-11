import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // 🔹 جلب بيانات المستخدم من localStorage إذا لم يتم تمريرها كـ props
  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const currentUser = user || storedUser;

  useEffect(() => {
    // 🔸 التحقق من أن المستخدم موجود وله دور
    if (!currentUser) return;
    if (!currentUser.role) return;

    // 🔸 السماح فقط للأدمن بالدخول
    if (currentUser.role !== "admin") {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [currentUser, navigate]);

  // 🔸 أثناء التحميل
  if (loading || !currentUser || !currentUser.role) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-white p-6 text-black">
      {/* 🔹 رأس الصفحة */}
      <header className="bg-gray-100 shadow rounded-lg p-6 mb-6 text-center">
        <div className="text-3xl font-bold text-black mb-2">Admin Dashboard</div>
        <div className="text-xl text-gray-700">Welcome Admin</div>
      </header>

      {/* 🔹 البطاقات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ✅ إدارة المستخدمين */}
        <div
          className="bg-gray-200 text-black p-6 rounded-lg shadow cursor-pointer text-center hover:bg-gray-300 transition"
          onClick={() => navigate("/admin/users")}
        >
          👥 Manage Users
        </div>


        {/* ✅ إدارة المنتجات */}
        <div
          className="bg-gray-200 text-black p-6 rounded-lg shadow cursor-pointer text-center hover:bg-gray-300 transition"
          onClick={() => navigate("/admin/products")}
        >
          🛒 Manage Products
        </div>

        {/* ✅ إدارة الطلبات */}

        <div
          className="bg-gray-200 text-black p-6 rounded-lg shadow cursor-pointer text-center hover:bg-gray-300 transition"
          onClick={() => navigate("/admin/orders")}
        >
          📦 Manage Orders
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
