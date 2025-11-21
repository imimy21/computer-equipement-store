import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Cart from "./cart";
import ModalLogin from "./ModalLogin";
import { useNavigate } from "react-router-dom"; 

const webcamProducts = [
  { id: 1, name: "Logitech C270", image: "/Webcam1.png", price: 4500, description: "HD webcam with built-in microphone. Ideal for video calls." },
  { id: 2, name: "Razer Kiyo", image: "/Webcam2.png", price: 22000, description: "Streaming webcam with adjustable ring light." },
  { id: 3, name: "Microsoft LifeCam HD", image: "/Webcam3.png", price: 12000, description: "High-quality webcam for home and office use." },
  { id: 4, name: "Logitech Brio", image: "/Webcam4.png", price: 35000, description: "4K ultra HD webcam for professional streaming." },
  { id: 5, name: "Creative Live! Cam", image: "/Webcam5.png", price: 8000, description: "Compact webcam with clear video and audio." },
];

function PeripheWebcam() {
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
          📹 Webcams
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
        Discover our selection of high-quality webcams for video calls, streaming, and recording.
      </p>

      {/* Products */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 items-stretch">
        {webcamProducts.map((product) => (
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

export default PeripheWebcam;