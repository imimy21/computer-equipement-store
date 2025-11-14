import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Cart from "./cart";
import ModalLogin from "./ModalLogin";

const clavierProducts = [
  { id: 1, name: "Logitech K120", image: "/keyboard1.png", price: 3750, description: "Reliable wired keyboard for everyday use. Quiet and comfortable typing." },
  { id: 2, name: "Corsair K70", image: "/keyboard2.png", price: 18000, description: "Mechanical gaming keyboard with RGB lighting. Durable and fast response." },
  { id: 3, name: "Razer BlackWidow", image: "/keyboard3.png", price: 22500, description: "High-performance mechanical keyboard for gamers. Customizable keys." },
  { id: 4, name: "HP K2500", image: "/keyboard4.png", price: 4500, description: "Compact and quiet keyboard for office use. Simple and elegant design." },
  { id: 5, name: "Dell KB216", image: "/keyboard5.png", price: 4200, description: "Durable wired keyboard with comfortable typing. Sturdy and reliable." },
];

function PeripheKeyboard() {
  const [showPanier, setShowPanier] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);

  const { panier, addToPanier } = useCart();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const addToCart = (product) => {
    addToPanier(product);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
  };

  // ✅ التصحيح: ModalLogin يظهر فقط إذا لم يكن هناك مستخدم
  const handleBuyNow = (product) => {
    if (!user) {
      setSelectedProduct(product);
      setIsLoginModalOpen(true);
    } else {
      // إذا كان هناك مستخدم، نفذ عملية الشراء مباشرة
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

  const cartCount = panier.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <div className="bg-[#f8f5f9] min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#e9e0eb] shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center w-full">
          ⌨️ Keyboards
        </h1>
        
        <div className="flex items-center gap-4">
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
      

      <p className="text-center text-gray-700 mt-4 mb-6 text-lg">
        Discover our collection of comfortable and high-performance keyboards..
      </p>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 items-stretch">
        {clavierProducts.map((product) => (
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

      <Cart
        showPanier={showPanier}
        setShowPanier={setShowPanier}
      />

      {/* ModalLogin يظهر فقط إذا لم يكن هناك مستخدم */}
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

export default PeripheKeyboard;