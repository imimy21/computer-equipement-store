import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Cart from "./cart";
import ModalLogin from "./ModalLogin";

const sourisProducts = [
  { id: 1, name: "Logitech M185", image: "/mouse1.png", price: 2500, description: "Compact and reliable wireless mouse, perfect for everyday use." },
  { id: 2, name: "Razer DeathAdder", image: "/mouse2.png", price: 13500, description: "Ergonomic gaming mouse with high-precision sensor." },
  { id: 3, name: "Corsair Harpoon", image: "/mouse3.png", price: 9000, description: "Lightweight gaming mouse with programmable buttons." },
  { id: 4, name: "Microsoft Bluetooth", image: "/mouse4.png", price: 3200, description: "Stylish and economical Bluetooth mouse." },
  { id: 5, name: "Logitech MX Master", image: "/mouse5.png", price: 22000, description: "High-end mouse for productivity and creation." },
];

function PeripheMouse() {
  const [showPanier, setShowPanier] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);

  // ✅ استخدام Context للسلة بدلاً من useState محلي
  const { panier, addToPanier } = useCart();

  // ✅ فحص إذا كان المستخدم مسجل الدخول
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ استخدام addToPanier من Context
  const addToCart = (product) => {
    addToPanier(product);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
  };

  // ✅ نفس منطق Buy Now من Keyboard
  const handleBuyNow = (product) => {
    if (!user) {
      setSelectedProduct(product);
      setIsLoginModalOpen(true);
    } else {
      addToCart(product);
      console.log("عملية شراء مباشرة:", product);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    const mockUser = { displayName: "User", email: "user@example.com" };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    if (selectedProduct) {
      addToCart(selectedProduct);
      setSelectedProduct(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // ✅ استخدام panier من Context
  const cartCount = panier.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <div className="bg-[#f8f5f9] min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#e9e0eb] shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center w-full">
          🖱️ Mouse
        </h1>
        
        <div className="flex items-center gap-4">
          {/* معلومات المستخدم */}
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">
                Welcome, {user.displayName || user.email}!
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}

          {/* زر تسجيل الدخول */}
          {!user && (
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                      backgroundColor: "#3498db",
                    }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition font-semibold"
            >
              Login
            </button>
          )}

          {/* زر السلة */}
          <button
            onClick={() => setShowPanier(true)}
            className="relative bg-[#e9e0eb] px-4 py-2 rounded-xl font-semibold flex items-center gap-2"
          >
            🛒
            <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Description */}
      <p className="text-center text-gray-700 mt-4 mb-6 text-lg">
        Discover our collection of comfortable and high-performance mice.
      </p>

      {/* Products - نفس العرض بدون تغيير */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 items-stretch">
        {sourisProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 hover:shadow-xl transition h-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-h-40 object-contain"
            />
            <h3 className="font-semibold text-gray-800 text-lg mt-3 text-center">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm text-center mt-1 flex-1">
              {product.description}
            </p>
            <p className="text-gray-900 font-bold mt-2">{product.price} DA</p>
            <div className="flex gap-2 mt-3 w-full">
              <button
                onClick={() => addToCart(product)}
                style={{
                      flex: 1,
                      padding: "10px",
                      backgroundColor: "#3498db",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm font-semibold"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                className="flex-1 bg-green-500 text-black py-2 rounded-md hover:bg-green-600 transition text-sm font-semibold"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ✅ استخدام مكون Cart الموحد بدلاً من السلة المحلية */}
      <Cart
        showPanier={showPanier}
        setShowPanier={setShowPanier}
      />

      {/* ✅ ModalLogin */}
      {isLoginModalOpen && (
        <ModalLogin 
          isOpen={isLoginModalOpen}
          onRequestClose={() => {
            setIsLoginModalOpen(false);
            setSelectedProduct(null);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <footer className="text-center text-gray-500 text-sm py-6 mt-10">
        © 2025 CompDZ — All Rights Reserved
      </footer>
    </div>
  );
}

export default PeripheMouse;
