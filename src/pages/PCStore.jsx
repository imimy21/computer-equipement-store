import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Cart from "./cart";
import ModalLogin from "./ModalLogin";
import { useNavigate } from "react-router-dom"; 

const pcProducts = [
  { id: 1, name: "MacBook Pro 16-inch", image: "https://webstar-electro.com/documents/document_service_21038_698_5_1473342992.jpg", price: 376500, description: "M3 Pro Chip / 18GB RAM / 512GB SSD / Liquid Retina XDR" },
  { id: 2, name: "Dell XPS 15", image: "https://www.acomputerservice.com.pe/5148/notebook-dell-latitude-14-3420-14-hd-i5-1135g7-24ghz-8gb-ddr4-3200mhz-512gb-ssd-kw11n.jpg", price: 268900, description: "Intel i9 / 32GB RAM / 1TB SSD / OLED Display" },
  { id: 3, name: "HP Spectre x360", image: "https://www.elasslihitech.com/wp-content/uploads/2023/11/LD0005638889_2.jpg", price: 201600, description: "Intel i7 / 16GB RAM / 512GB SSD / Touchscreen" },
  { id: 4, name: "Lenovo ThinkPad X1", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnYpGL794F6wpnWEm1-eWaR2NqqfkUytjESFzxgFaU8jxVcc4Pe8F3MdtrViqt9Qq7lg&usqp=CAU", price: 228500, description: "Intel i7 / 16GB RAM / 1TB SSD / Business Laptop" },
  { id: 5, name: "ASUS ROG Zephyrus", image: "https://dlcdnwebimgs.asus.com/gain/DBB47F70-325D-4510-9E3E-0548FEF67FB1", price: 295700, description: "RTX 4070 / 32GB RAM / 1TB SSD / Gaming Laptop" },
  { id: 6, name: "Microsoft Surface Laptop 5", image: "https://myshop.pk/pub/media/catalog/product/cache/26f8091d81cea4b38d820a1d1a4f62be/p/l/platinum2-myshop-pk-16_1.jpg", price: 174700, description: "Intel i5 / 8GB RAM / 512GB SSD / Touchscreen" }
];

function PCStore() {
  const [showPanier, setShowPanier] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { panier, addToPanier } = useCart();
  const navigate = useNavigate(); 

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const addToCart = (product) => {
    if (!user) {
      setSelectedProduct(product);
      setIsLoginModalOpen(true);
    } else {
      addToPanier(product);
    }
  };

  const handleBuyNow = (product) => {
    if (!user) {
      setSelectedProduct(product);
      setIsLoginModalOpen(true);
    } else {
      navigate("/payment", { state: { product } });
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);

    if (selectedProduct) {
      navigate("/payment", { state: { product: selectedProduct } });
      setSelectedProduct(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userData');
  };

  const cartCount = panier.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <div className="bg-[#f8f5f9] min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#e9e0eb] shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center w-full">
          💻 PCStore
        </h1>
        <div className="flex items-center gap-4">
          {user ? (
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          ) : (
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

      <p className="text-center text-gray-700 mt-4 mb-6 text-lg">
        Discover our collection of high-performance laptops for work, gaming, and creativity.
      </p>

      {/* Products */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 items-stretch">
        {pcProducts.map((product) => (
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
            <p className="text-gray-900 font-bold mt-2">{product.price.toLocaleString()} DA</p>
            <div className="flex gap-2 mt-3 w-full">
              <button
                onClick={() => addToCart(product)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${user ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-white cursor-not-allowed"}`}
              >
                Add to Cart
              </button>
              <button 
                onClick={() => handleBuyNow(product)}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${user ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 text-white cursor-not-allowed"}`}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </section>

      <Cart showPanier={showPanier} setShowPanier={setShowPanier} />

      {isLoginModalOpen && (
       <ModalLogin 
          isOpen={isLoginModalOpen}
          onRequestClose={() => {
            setIsLoginModalOpen(false);
            setSelectedProduct(null);
          }}
          onLoginSuccess={handleLoginSuccess}
          user={user}
          setUser={setUser}
        />
      )}

      <footer className="text-center text-gray-500 text-sm py-6 mt-10">
        © 2025 CompDZ — All Rights Reserved
      </footer>
    </div>
  );
}

export default PCStore;
