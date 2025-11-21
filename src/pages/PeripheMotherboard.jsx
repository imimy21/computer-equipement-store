import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Cart from "./cart";
import ModalLogin from "./ModalLogin";
import { useNavigate } from "react-router-dom";

const motherboardProducts = [
  { 
    id: 1, 
    name: "ASUS ROG Maximus Z790", 
    image: "/motherboard1.png", 
    price: 45000, 
    description: "High-end gaming motherboard with premium features and RGB lighting.",
    specs: "Intel Z790 / DDR5 / WiFi 6E"
  },
  { 
    id: 2, 
    name: "Gigabyte B650 AORUS", 
    image: "/motherboard2.png", 
    price: 32000, 
    description: "AMD AM5 motherboard with excellent connectivity and cooling.",
    specs: "AMD B650 / DDR5 / PCIe 5.0"
  },
  { 
    id: 3, 
    name: "MSI MPG X670E Carbon", 
    image: "/motherboard3.png", 
    price: 52000, 
    description: "Premium motherboard for Ryzen 7000 series with extensive features.",
    specs: "AMD X670E / DDR5 / Thunderbolt 4"
  },
  { 
    id: 4, 
    name: "ASRock B760M Steel", 
    image: "/motherboard4.png", 
    price: 28000, 
    description: "Micro-ATX motherboard with great value and performance.",
    specs: "Intel B760 / DDR4 / M.2 Slots"
  },
  { 
    id: 5, 
    name: "ASUS TUF Gaming B550", 
    image:"/motherboard5.png" , 
    price: 22000, 
    description: "Durable gaming motherboard with military-grade components.",
    specs: "AMD B550 / DDR4 / PCIe 4.0"
  },
  { 
    id: 6, 
    name: "Gigabyte Z690 UD", 
    image: "/motherboard6.png", 
    price: 35000, 
    description: "Affordable Intel motherboard with great overclocking capabilities.",
    specs: "Intel Z690 / DDR5 / 2.5G LAN"
  },
  
 
];

function PeripheMotherboard() {
  const [showPanier, setShowPanier] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);

  const { panier, addToPanier } = useCart();

  const navigate = useNavigate(); 

  useEffect(() => {
  // غير 'user' إلى 'userData'
  const savedUser = localStorage.getItem('userData');
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);

  const addToCart = (product) => {
    addToPanier(product);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
  };

  const handleBuyNow = (product) => {
    if (!user) {
      setSelectedProduct(product);
      setIsLoginModalOpen(true);
    } else {
      // الانتقال المباشر لصفحة الدفع
      navigate("/payment", { state: { product } });
    }
  };

  const handleLoginSuccess = () => {
  setIsLoginModalOpen(false);
  // لا حاجة لـ mockUser - البيانات تأتي من Firebase مباشرة
  const userData = JSON.parse(localStorage.getItem('userData'));
  setUser(userData);
  
  if (selectedProduct) {
    navigate("/payment", { state: { product: selectedProduct } });
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
          🖥️ Motherboards
        </h1>
        
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
             
              
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

      {/* Description */}
      <p className="text-center text-gray-700 mt-4 mb-6 text-lg">
        Discover our collection of high-quality motherboards for all your PC building needs..
      </p>

      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 items-stretch">
        {motherboardProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 hover:shadow-xl transition h-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-h-40 object-contain mb-3"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop";
              }}
            />
            <h3 className="font-semibold text-gray-800 text-lg text-center leading-tight">
              {product.name}
            </h3>
            
            {/* Motherboard Specs */}
            <div className="bg-gray-100 rounded-lg px-3 py-2 mt-2 w-full">
              <p className="text-gray-700 text-xs font-medium text-center">
                {product.specs}
              </p>
            </div>
            
            <p className="text-gray-600 text-sm text-center mt-3 flex-1">
              {product.description}
            </p>
            
            <p className="text-gray-900 font-bold text-xl mt-3">{product.price.toLocaleString()} DA</p>
            
            <div className="flex gap-2 mt-4 w-full">
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
            style={{
              flex: 1,
              padding: "10px",
              backgroundColor: user ? "#27ae60" : "#95a5a6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: user ? "pointer" : "not-allowed",
              transition: "all 0.3s ease"
            }}
          >
            {user ? "Buy Now" : "Buy Now"}
          </button>
            </div>
          </div>
        ))}
      </section>

      {/* Cart Component */}
      <Cart
        showPanier={showPanier}
        setShowPanier={setShowPanier}
      />

      {/* Login Modal */}
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

export default PeripheMotherboard;