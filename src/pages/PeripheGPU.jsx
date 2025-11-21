import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Cart from "./cart";
import ModalLogin from "./ModalLogin";
import { useNavigate } from "react-router-dom"; 

const gpuProducts = [
  { 
    id: 1, 
    name: "NVIDIA RTX 4090", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-P5lC8Q2nztj0gtISwu38amCqm7lY8TsGqQ&shttps://postperspective.com/wp-content/uploads/2022/10/GeForce-RTX4090-3QTR-Back-Left-1.jpg", 
    price: 220000, 
    description: "Flagship gaming GPU with 24GB GDDR6X and DLSS 3 technology.",
    specs: "24GB GDDR6X / 384-bit / 16384 Cores"
  },
  { 
    id: 2, 
    name: "AMD RX 7900 XTX", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBBFI9VB0g153oUckz3QK7_kOmK0W-gkV5Q&s", 
    price: 180000, 
    description: "High-end AMD GPU with 24GB GDDR6 and advanced ray tracing.",
    specs: "24GB GDDR6 / 384-bit / 6144 Cores"
  },
  { 
    id: 3, 
    name: "NVIDIA RTX 4080", 
    image: "https://m.media-amazon.com/images/I/71iaKN6nNrL.jpg", 
    price: 150000, 
    description: "Powerful GPU for 4K gaming and content creation.",
    specs: "16GB GDDR6X / 256-bit / 9728 Cores"
  },
  { 
    id: 4, 
    name: "AMD RX 7800 XT", 
    image: "https://www.asrock.com/Graphics-Card/photo/Radeon%20RX%207800%20XT%20Phantom%20Gaming%2016GB%20OC(M1).png", 
    price: 120000, 
    description: "Excellent mid-range GPU for 1440p gaming.",
    specs: "16GB GDDR6 / 256-bit / 3840 Cores"
  },
  { 
    id: 5, 
    name: "NVIDIA RTX 4070 Ti", 
    image: "https://www.maxframe.dz/gla-adminer/uploads/article/full/469136545_04-01-2025_573576.jpg", 
    price: 110000, 
    description: "Great performance for 1440p gaming with DLSS 3.",
    specs: "12GB GDDR6X / 192-bit / 7680 Cores"
  },
  { 
    id: 6, 
    name: "AMD RX 7700 XT", 
    image: "https://www.maxframe.dz/gla-adminer/uploads/article/full/471480968_02-07-2024_347822.jpg", 
    price: 85000, 
    description: "Budget-friendly GPU for 1080p and 1440p gaming.",
    specs: "12GB GDDR6 / 192-bit / 3456 Cores"
  },
 
];

function PeripheGPU() {
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
          🎮 Graphics Cards
        </h1>
        
        <div className="flex items-center gap-4">
        

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
        Discover our collection of high-performance graphics cards for gaming and content creation..
      </p>

      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 items-stretch">
        {gpuProducts.map((product) => (
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
            
            {/* GPU Specs */}
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

export default PeripheGPU;