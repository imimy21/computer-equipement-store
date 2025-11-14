import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Cart from "./cart";
import ModalLogin from "./ModalLogin";

const ssdProducts = [
  { 
    id: 1, 
    name: "Samsung 990 Pro 2TB", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDHN8Ak15cCrAHYDu80snqY9GVHyM3LXLLw&s", 
    price: 35000, 
    description: "High-performance NVMe SSD with incredible read/write speeds for gaming and professional work.",
    specs: "2TB NVMe / 7450MB/s / PCIe 4.0"
  },
  { 
    id: 2, 
    name: "WD Black SN850X 4TB", 
    image: "https://www.provantage.com/fullsize/1074208363_Alternate-Image1.JPG", 
    price: 60000, 
    description: "Extreme performance SSD with heatsink for sustained high-speed operations.",
    specs: "4TB NVMe / 7300MB/s / PCIe 4.0"
  },
  { 
    id: 3, 
    name: "Crucial P5 Plus 1TB", 
    image: "https://www.digitecdz.com/wp-content/uploads/2022/08/LD0005871069_1_0005871071.jpg", 
    price: 18000, 
    description: "Excellent value NVMe SSD with great performance for everyday computing.",
    specs: "1TB NVMe / 6600MB/s / PCIe 4.0"
  },
  { 
    id: 4, 
    name: "Samsung 870 Evo 2TB", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFnbKtQvg8JsSCFI1J5f9syUySgvg75jaOw&s", 
    price: 22000, 
    description: "Reliable SATA SSD with excellent endurance and consistent performance.",
    specs: "2TB SATA / 560MB/s / 2.5-inch"
  },
  { 
    id: 5, 
    name: "Kingston NV2 1TB", 
    image: "https://media.ldlc.com/r1600/ld/products/00/05/97/36/LD0005973650.jpg", 
    price: 12000, 
    description: "Budget-friendly NVMe SSD perfect for budget gaming builds and upgrades.",
    specs: "1TB NVMe / 3500MB/s / PCIe 4.0"
  },
  
 
];

function PeripheSSD() {
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
          💾 SSD Storage
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

      {/* Description */}
      <p className="text-center text-gray-700 mt-4 mb-6 text-lg">
        Discover our collection of high-speed SSD storage for faster boot times and improved performance..
      </p>

      {/* Products Grid */}
<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 items-stretch">
        {ssdProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 hover:shadow-xl transition h-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-h-40 object-contain mb-3"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1599045118108-bf9954418b76?w=400&h=300&fit=crop";
              }}
            />
            <h3 className="font-semibold text-gray-800 text-lg text-center leading-tight">
              {product.name}
            </h3>
            
            {/* SSD Specs */}
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

export default PeripheSSD;