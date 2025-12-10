import React, { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";
import Cart from "./cart";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; 

const PCStore = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPanier, setShowPanier] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const navigate = useNavigate();
  const { panier, addToPanier } = useCart();

  const products = [
    { id: 1, name: "MacBook Pro 16-inch", type: "Apple", price: 376500, image: "hp.png", features: ["M3 Pro Chip", "18GB RAM", "512GB SSD", "Liquid Retina XDR"], specs: "16.2-inch Liquid Retina XDR / Apple M3 Pro / 18GB RAM / 512GB SSD" },
    { id: 2, name: "Dell XPS 15", type: "Windows", price: 268900, image: "Dell_XPS_15.png", features: ["Intel i9", "32GB RAM", "1TB SSD", "OLED Display"], specs: "15.6-inch 4K OLED Touch / Intel i9 / 32GB RAM / 1TB SSD" },
    { id: 3, name: "HP Spectre x360", type: "2-in-1", price: 201600, image: "HP_Spectre_x360.png", features: ["Intel i7", "16GB RAM", "512GB SSD", "Touchscreen"], specs: "13.5-inch OLED Touch / Intel Core i7-1355U / 16GB LPDDR5 RAM / 512GB SSD" },
    { id: 4, name: "Lenovo ThinkPad X1", type: "Business", price: 228500, image: "Lenovo_ThinkPad_X1.png", features: ["Intel i7", "16GB RAM", "1TB SSD", "Military Grade"], specs: "14-inch 2.8K OLED / Intel Core i7-1365U / 16GB LPDDR5 / 1TB SSD" },
    { id: 5, name: "ASUS ROG Zephyrus", type: "Gaming", price: 295700, image: "ASUS_ROG_Zephyrus.png", features: ["RTX 4070", "32GB RAM", "1TB SSD", "165Hz Display"], specs: "15.6-inch QHD 165Hz / AMD Ryzen 9 7940HS / 32GB DDR5 RAM / 1TB NVMe SSD" },
    { id: 6, name: "Microsoft Surface Laptop 5", type: "Windows", price: 174700, image: "Microsoft_Surface_Laptop5.png", features: ["Intel i5", "8GB RAM", "512GB SSD", "Touchscreen"], specs: "13.5-inch PixelSense Touch / Intel Core i5-1235U / 8GB LPDDR5x RAM / 512GB SSD" }
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const getTypeColor = (type) => {
    const colors = { "Apple": "#0070c9", "Windows": "#0078d4", "2-in-1": "#e67e22", "Business": "#c0392b", "Gaming": "#9b59b6", "Ultrabook": "#16a085" };
    return colors[type] || "#7f8c8d";
  };

  const handleBuyNow = (product) => {
    if (!user) { setSelectedProduct(product); setIsLoginModalOpen(true); }
    else navigate("/payment", { state: { product } });
  };

  const addToCart = (product) => { addToPanier(product); setCartAnimation(true); setTimeout(() => setCartAnimation(false), 300); };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
    if (selectedProduct) { navigate("/payment", { state: { product: selectedProduct } }); setSelectedProduct(null); }
  };

  const confirmLogout = () => setShowConfirmLogout(true);
  const cancelLogout = () => setShowConfirmLogout(false);
  const handleLogout = () => { setUser(null); localStorage.removeItem('userData'); };
  const cartCount = panier.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-[#f8f5f9] min-h-screen flex flex-col relative">
      <header className="flex justify-between items-center px-6 py-4 bg-[#e9e0eb] shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center w-full">💻 PCStore - Laptops</h1>
        <div className="flex items-center gap-4">
          {!user && <button onClick={() => setIsLoginModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition font-semibold">Login</button>}
          <button onClick={() => setShowPanier(true)} className="relative bg-[#e9e0eb] px-4 py-2 rounded-xl font-semibold flex items-center gap-2">
            🛒<span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-2">{cartCount}</span>
          </button>
        </div>
      </header>

      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-red-600">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Sign Out</h2>
            <p className="text-gray-600 mb-6 text-lg">Are you sure you want to sign out of your account?</p>
            <div className="space-y-3">
              <button onClick={handleLogout} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all">Yes, Sign Out</button>
              <button onClick={cancelLogout} className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Cart showPanier={showPanier} setShowPanier={setShowPanier} />

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 mb-8 text-lg">{products.length} high-performance models available {!user && " - Login to make purchases"}</p>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 items-stretch">
          {products.map((laptop) => (
            <div key={laptop.id} className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 hover:shadow-xl transition h-full">
              <img src={`/${laptop.image}`} alt={laptop.name} className="max-h-40 object-contain mb-3" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop"; }} />
              <div className="rounded-lg px-3 py-1 mb-2 text-white text-xs font-medium" style={{ backgroundColor: getTypeColor(laptop.type) }}>{laptop.type}</div>
              <h3 className="font-semibold text-gray-800 text-lg text-center leading-tight">{laptop.name}</h3>
              <p className="text-gray-900 font-bold text-xl mt-2">{laptop.price.toLocaleString()} DA</p>
              <div className="bg-gray-100 rounded-lg px-3 py-2 mt-2 w-full">
                <p className="text-gray-700 text-xs font-medium text-center">{laptop.specs}</p>
              </div>
              <div className="flex flex-wrap gap-1 mt-2 justify-center">
                {laptop.features.map((feature, idx) => <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{feature}</span>)}
              </div>
              <div className="flex gap-2 mt-4 w-full">
                <button onClick={() => addToCart(laptop)} className="flex-1 bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition">Add to Cart</button>
                <button onClick={() => handleBuyNow(laptop)} className={`flex-1 py-2 rounded-md font-semibold transition ${user ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>Buy Now</button>
              </div>
            </div>
          ))}
        </section>
      </div>

      <ModalLogin isOpen={isLoginModalOpen} onRequestClose={() => { setIsLoginModalOpen(false); setSelectedProduct(null); }} onLoginSuccess={handleLoginSuccess} />

      <footer className="text-center text-gray-500 text-sm py-6 mt-10">
        <p>© 2025 CompDZ — All Rights Reserved</p>
        <p className="mt-2 text-gray-400">{user ? `Logged in as: ${user.email}` : "Please login to make purchases"}</p>
      </footer>
    </div>
  );
};

export default PCStore;
