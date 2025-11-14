import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Cart from "./cart";
import ModalLogin from "./ModalLogin";

const processorProducts = [
  { 
    id: 1, 
    name: "Intel Core i9-13900K", 
    image: "/processor1.png", 
    price: 65000, 
    description: "24-core processor with up to 5.8GHz boost, perfect for gaming and content creation.",
    specs: "24 Cores / 32 Threads / 5.8 GHz"
  },
  { 
    id: 2, 
    name: "AMD Ryzen 9 7950X", 
    image: "/processor2.png", 
    price: 58000, 
    description: "16-core Zen 4 processor with exceptional multi-threading performance.",
    specs: "16 Cores / 32 Threads / 5.7 GHz"
  },
  { 
    id: 3, 
    name: "Intel Core i7-13700K", 
    image: "/processor3.png", 
    price: 42000, 
    description: "16-core processor offering great performance for gaming and productivity.",
    specs: "16 Cores / 24 Threads / 5.4 GHz"
  },
  { 
    id: 4, 
    name: "AMD Ryzen 7 7800X3D", 
    image: "/processor4.png", 
    price: 38000, 
    description: "8-core processor with 3D V-Cache technology for exceptional gaming performance.",
    specs: "8 Cores / 16 Threads / 5.0 GHz"
  },
  { 
    id: 5, 
    name: "Intel Core i5-13600K", 
    image: "/processor5.png", 
    price: 28000, 
    description: "14-core processor delivering excellent value for gaming and everyday tasks.",
    specs: "14 Cores / 20 Threads / 5.1 GHz"
  },
  { 
    id: 6, 
    name: "AMD Ryzen 5 7600X", 
    image: "/processor6.png", 
    price: 22000, 
    description: "6-core processor with high clock speeds for budget gaming builds.",
    specs: "6 Cores / 12 Threads / 5.3 GHz"
  },
  { 
    id: 7, 
    name: "Intel Core i3-13100", 
    image: "/processor7.png", 
    price: 15000, 
    description: "4-core processor ideal for office use and entry-level gaming.",
    specs: "4 Cores / 8 Threads / 4.5 GHz"
  },
  { 
    id: 8, 
    name: "AMD Ryzen 9 7900X", 
    image: "/processor8.png", 
    price: 48000, 
    description: "12-core processor with excellent multi-core performance for professionals.",
    specs: "12 Cores / 24 Threads / 5.6 GHz"
  }
];

function PeripheProcessor() {
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

  const cartCount = panier.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <div className="bg-[#f8f5f9] min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#e9e0eb] shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center w-full">
          🖥️ Processors
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
        Discover our collection of high-performance processors for gaming and professional work..
      </p>

      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 items-stretch">
        {processorProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 hover:shadow-xl transition h-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-h-40 object-contain mb-3"
            />
            <h3 className="font-semibold text-gray-800 text-lg text-center leading-tight">
              {product.name}
            </h3>
            
            {/* Processor Specs */}
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

export default PeripheProcessor;