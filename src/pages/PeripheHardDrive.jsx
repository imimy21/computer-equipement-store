import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Cart from "./cart";
import ModalLogin from "./ModalLogin";
import { useNavigate } from "react-router-dom";
const hardDriveProducts = [
  { 
    id: 1, 
    name: "Seagate BarraCuda 4TB", 
    image: "https://m.media-amazon.com/images/I/61HTOLqpL4L.jpg", 
    price: 18000, 
    description: "Reliable 3.5-inch HDD for desktop storage with great capacity and performance.",
    specs: "4TB HDD / 5400 RPM / SATA 6Gb/s"
  },
  { 
    id: 2, 
    name: "WD Blue 6TB", 
    image: "https://media.ldlc.com/r1600/ld/products/00/06/16/20/LD0006162048.jpg", 
    price: 25000, 
    description: "High-capacity hard drive perfect for data storage and backup solutions.",
    specs: "6TB HDD / 5400 RPM / SATA 6Gb/s"
  },
  { 
    id: 3, 
    name: "Toshiba P300 3TB", 
    image: "https://www.toshiba-storage.com/wp/wp-content/uploads/2019/09/P300_Highlihgt_Product_Image.png", 
    price: 15000, 
    description: "Performance-oriented HDD for gaming and desktop applications.",
    specs: "3TB HDD / 7200 RPM / SATA 6Gb/s"
  },
  { 
    id: 4, 
    name: "Seagate IronWolf 8TB", 
    image: "https://admin-info.dz/wp-content/uploads/2024/08/LD0004001524_2.jpg", 
    price: 35000, 
    description: "NAS-optimized hard drive designed for 24/7 operation in network storage.",
    specs: "8TB HDD / 7200 RPM / NAS Optimized"
  },
  { 
    id: 5, 
    name: "WD Black 2TB", 
    image: "https://www.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/wd-black-desktop-sata-hdd/gallery/wd-black-desktop-2tb.png.thumb.1280.1280.png", 
    price: 12000, 
    description: "Performance HDD with dual-core processor for gaming and creative work.",
    specs: "2TB HDD / 7200 RPM / Performance"
  },
  
];

function PeripheHardDrive() {
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

  const cartCount = panier.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <div className="bg-[#f8f5f9] min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#e9e0eb] shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center w-full">
          💽 Hard Drives
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
        Discover our collection of high-capacity hard drives for all your storage needs..
      </p>

      {/* Products Grid */}
     <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 items-stretch">
        {hardDriveProducts.map((product) => (
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
            
            {/* Hard Drive Specs */}
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

export default PeripheHardDrive;