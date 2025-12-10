import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, getUserRole } from "../firebase";

const Navbar = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const role = await getUserRole(firebaseUser.uid);
          setUserRole(role);

          const userData = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            role: role,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
        } catch (error) {
          console.error("Error getting role:", error);
          setUserRole("user");
        }
      } else {
        const savedUser = localStorage.getItem("userData");
        if (savedUser) {
          const data = JSON.parse(savedUser);
          setUser(data);
          setUserRole(data.role);
        } else {
          setUser(null);
          setUserRole(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    setUser(null);
    setUserRole(null);
    localStorage.removeItem("userData");
    onClose();
  };

  const goToAdminPanel = () => {
  onClose();
  window.location.href = "/AdminDashboard"; // ← يجب أن يطابق Route
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 z-40"
        style={{ background: "transparent" }}
        onClick={onClose}
      />

      <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-lg p-6 overflow-y-auto z-50">
        {/* رأس القائمة */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* زر الإدمن */}
        {userRole === "admin" && (
          <div className="mb-6 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-600">👑</span>
              <span className="text-sm font-bold text-purple-700">
                Admin Access
              </span>
            </div>
            <button
              onClick={goToAdminPanel}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
            >
              Admin Panel
            </button>
          </div>
        )}

        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            onClick={onClose}
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>

          <div className="flex items-center gap-3 p-3 text-gray-700 font-bold">
            <span>🖥️</span>
            <span>Products</span>
          </div>

          <Link
            to="/PCStore"
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition ml-4"
            onClick={onClose}
          >
            <span>📱</span>
            <span>Laptops</span>
          </Link>

          <Link
            to="/Monitor"
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
            onClick={onClose}
          >
            <span>📺</span>
            <span>Monitors</span>
          </Link>

          <Link
            to="/composants"
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
            onClick={onClose}
          >
            <span>🔧</span>
            <span>PC Components</span>
          </Link>

          <Link
            to="/peripheriques"
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
            onClick={onClose}
          >
            <span>⌨️</span>
            <span>Peripherals & Accessories</span>
          </Link>

          <Link
            to="/printers"
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
            onClick={onClose}
          >
            <span>🖨️</span>
            <span>Printers</span>
          </Link>

          <Link
            to="/computer-cases"
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
            onClick={onClose}
          >
            <span>🖥️</span>
            <span>Computer Cases</span>
          </Link>

          <Link
            to="/cables"
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
            onClick={onClose}
          >
            <span>🔌</span>
            <span>Cables & Adapters</span>
          </Link>

          <Link
            to="/gaming-zone"
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
            onClick={onClose}
          >
            <span>🎮</span>
            <span>Gaming Zone</span>
          </Link>

          <Link
            to="/about"
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            onClick={onClose}
          >
            <span>ℹ️</span>
            <span>About Us</span>
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            onClick={onClose}
          >
            <span>📞</span>
            <span>Contact</span>
          </Link>

          {/* معلومات المستخدم */}
          {user && (
            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-600">👤</span>
                <span className="text-sm font-semibold text-blue-700">
                  {user.displayName || user.email}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-600">
                  {userRole === "admin" ? "Administrator" : "User"}
                </span>
                <span className="text-xs text-green-600 font-semibold">● Online</span>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-2 w-full bg-red-500 text-white py-1 rounded-lg text-sm hover:bg-red-600 transition-all"
              >
                Sign Out
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
