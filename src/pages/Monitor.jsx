
import React, { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";
import Cart from "./cart";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; 

const MonitorPage = () => {
  const [monitors] = useState([
    { id: 1, name: 'Dell UltraSharp 27"', price: 40350, resolution: '2560x1440 QHD', refreshRate: '60Hz', panelType: 'IPS', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u2724d/media-gallery/monitor-ultrasharp-u2724d-qhd-gy-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=914&qlt=100,1&resMode=sharp2&size=914,804&chrss=full', features: ['QHD Resolution', '60Hz Refresh Rate', 'IPS Panel'], specs:" '27 QHD IPS' / 2560x1440 / 60Hz " },
    { id: 2, name: 'Samsung Odyssey 32"', price: 60550, resolution: '3840x2160 4K', refreshRate: '144Hz', panelType: 'VA', image: 'https://images.samsung.com/is/image/samsung/fr-odyssey-g5-g95t-lc32g55tqwuxen-frontblack-thumb-310786532', features: ['4K Resolution', '144Hz Refresh Rate', 'VA Panel'], specs: "'32 4K VA' / 3840x2160 / 144Hz " },
    { id: 3, name: 'LG UltraGear 27"', price: 53800, resolution: '2560x1440 QHD', refreshRate: '165Hz', panelType: 'Nano IPS', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyZEUeqSp1TGG6nNnVXLoYNru4qtrbPqcVgA&s', features: ['QHD Resolution', '165Hz Refresh Rate', 'Nano IPS'], specs:" '27 QHD Nano IPS'/ 2560x1440  / 165Hz " },
    { id: 4, name: 'ASUS TUF Gaming 24"', price: 26900, resolution: '1920x1080 FHD', refreshRate: '144Hz', panelType: 'IPS', image: 'https://click-dz.com/wp-content/uploads/2024/01/asus24.jpg', features: ['FHD Resolution', '144Hz Refresh Rate', 'Gaming IPS'], specs: " '24 FHD IPS' / 1920x1080  / 144Hz " },
    { id: 5, name: 'Acer Predator 34"', price: 107600, resolution: '3440x1440 UWQHD', refreshRate: '180Hz', panelType: 'IPS', image: 'https://i.ebayimg.com/images/g/Q2cAAOSwzw5jjWL2/s-l400.jpg', features: ['UltraWide QHD', '180Hz Refresh Rate', 'Curved IPS'], specs:" '34 UWQHD Curved' / 3440x1440/180Hz " }
  ]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPanier, setShowPanier] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedMonitor, setSelectedMonitor] = useState(null);

  const { panier, addToPanier } = useCart();
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const getTypeColor = (panelType) => {
    const colors = { "IPS": "#0070c9", "VA": "#0078d4", "Nano IPS": "#e67e22", "Gaming": "#c0392b" };
    return colors[panelType] || "#7f8c8d";
  };

  const handleBuyNow = (product) => {
    if (!user) {
      setSelectedMonitor(product);
      setIsLoginModalOpen(true);
    } else {
      navigate("/payment", { state: { product } });
    }
  };

  const addToCartHandler = (product) => {
    if (!user) {
      setSelectedMonitor(product);
      setIsLoginModalOpen(true);
    } else {
      addToPanier(product);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) setUser(userData);

    if (selectedMonitor) {
      navigate("/payment", { state: { product: selectedMonitor } });
      setSelectedMonitor(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userData');
  };

  const cartCount = panier.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-[#f8f5f9] min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#e9e0eb] shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center w-full">🖥️ MonitorStore</h1>
        <div className="flex items-center gap-4">
          {!user && (
  <button 
    onClick={() => setIsLoginModalOpen(true)}
    style={{
      backgroundColor:

"#3498db",
    }}
    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition font-semibold"
  >
    Login
  </button>
)}

          <button onClick={() => setShowPanier(true)} className="relative bg-[#e9e0eb] px-4 py-2 rounded-xl font-semibold flex items-center gap-2">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-2">{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Description */}
      <p className="text-center text-gray-700 mt-4 mb-6 text-lg">{monitors.length} premium monitors available{!user && " - Login to make purchases"}</p>

      {/* Monitors Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 items-stretch">
        {monitors.map((monitor) => (
          <div key={monitor.id} className="bg-white rounded-2xl shadow-md flex flex-col p-4 hover:shadow-xl transition h-full">
        
            <img src={monitor.image} alt={monitor.name} className="max-h-40 object-contain mb-3" />
            <h3 className="font-semibold text-gray-800 text-lg text-center">{monitor.name}</h3>
            <p className="text-gray-600 text-sm text-center flex-1">{monitor.specs}</p>
            <p className="text-gray-900 font-bold mt-2">{monitor.price.toLocaleString()} DA</p>
            <div className="flex gap-2 mt-3 w-full">
              <button
                onClick={() => addToCart(monitor)}
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
            onClick={() => handleBuyNow(monitor)}
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

      <Cart showPanier={showPanier} setShowPanier={setShowPanier} />

      {isLoginModalOpen && (
        <ModalLogin
          isOpen={isLoginModalOpen}
          onRequestClose={() => { setIsLoginModalOpen(false); setSelectedMonitor(null); }}
          onLoginSuccess={handleLoginSuccess}
          user={user}
          setUser={setUser}
          userRole={user?.role || null}
          setUserRole={(role) => setUser(prev => ({ ...prev, role }))}
        />
      )}

      <footer className="text-center text-gray-500 text-sm py-6 mt-10 bg-[#2c3e50] text-white">
        © 2025 MonitorStore — All Rights Reserved
      </footer>
    </div>
  );
};

export default MonitorPage;