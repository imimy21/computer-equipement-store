import React, { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";
import Cart from "./cart";
import { useCart } from "../context/CartContext"; // تأكد من المسار الصحيح

const PCStore = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPanier, setShowPanier] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);

  // ✅ استخدام السلة العالمية من Context بدلاً من useState محلي
  const { panier, addToPanier, updateQuantity, removeFromPanier, total } = useCart();

  // بيانات المنتجات
  const products = [
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      type: "Apple",
      price: 376500,
      image: "https://webstar-electro.com/documents/document_service_21038_698_5_1473342992.jpg",
      features: ["M3 Pro Chip", "18GB RAM", "512GB SSD", "Liquid Retina XDR"],
      specs: {
        display: "16.2-inch Liquid Retina XDR",
        processor: "Apple M3 Pro 12-core",
        memory: "18GB Unified Memory",
        storage: "512GB SSD"
      }
    },
    {
      id: 2,
      name: "Dell XPS 15",
      type: "Windows",
      price: 268900,
      image: "https://www.acomputerservice.com.pe/5148/notebook-dell-latitude-14-3420-14-hd-i5-1135g7-24ghz-8gb-ddr4-3200mhz-512gb-ssd-kw11n.jpg",
      features: ["Intel i9", "32GB RAM", "1TB SSD", "OLED Display"],
      specs: {
        display: "15.6-inch 4K OLED Touch",
        processor: "Intel Core i9-13900H",
        memory: "32GB DDR5 RAM",
        storage: "1TB SSD"
      }
    },
    {
      id: 3,
      name: "HP Spectre x360",
      type: "2-in-1",
      price: 201600,
      image: "https://www.elasslihitech.com/wp-content/uploads/2023/11/LD0005638889_2.jpg",
      features: ["Intel i7", "16GB RAM", "512GB SSD", "Touchscreen"],
      specs: {
        display: "13.5-inch OLED Touch",
        processor: "Intel Core i7-1355U",
        memory: "16GB LPDDR5 RAM",
        storage: "512GB SSD"
      }
    },
    {
      id: 4,
      name: "Lenovo ThinkPad X1",
      type: "Business",
      price: 228500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnYpGL794F6wpnWEm1-eWaR2NqqfkUytjESFzxgFaU8jxVcc4Pe8F3MdtrViqt9Qq7lg&usqp=CAU",
      features: ["Intel i7", "16GB RAM", "1TB SSD", "Military Grade"],
      specs: {
        display: "14-inch 2.8K OLED",
        processor: "Intel Core i7-1365U",
        memory: "16GB LPDDR5",
        storage: "1TB SSD"
      }
    },
    {
      id: 5,
      name: "ASUS ROG Zephyrus",
      price:  295700,
      image: "https://dlcdnwebimgs.asus.com/gain/DBB47F70-325D-4510-9E3E-0548FEF67FB1",
      type: "Gaming",
      features: ["RTX 4070", "32GB RAM", "1TB SSD", "165Hz Display"],
      specs: {
        display: "15.6-inch QHD 165Hz",
        processor: "AMD Ryzen 9 7940HS",
        memory: "32GB DDR5 RAM",
        storage: "1TB NVMe SSD",
        battery: "Up to 8 hours"
      }
    },
    {
      id: 6,
      name: "Microsoft Surface Laptop 5",
      price:  174700,
      image: "https://myshop.pk/pub/media/catalog/product/cache/26f8091d81cea4b38d820a1d1a4f62be/p/l/platinum2-myshop-pk-16_1.jpg",
      type: "Windows",
      features: ["Intel i5", "8GB RAM", "512GB SSD", "Touchscreen"],
      specs: {
        display: "13.5-inch PixelSense Touch",
        processor: "Intel Core i5-1235U",
        memory: "8GB LPDDR5x RAM",
        storage: "512GB SSD",
        battery: "Up to 18 hours"
      }
    }
  ];

  // محاكاة حالة المستخدم
  useEffect(() => {
    const mockUser = localStorage.getItem('user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
  }, []);

  const getTypeColor = (type) => {
    const colors = {
      "Apple": "#0070c9",
      "Windows": "#0078d4",
      "2-in-1": "#e67e22",
      "Business": "#c0392b",
      "Gaming": "#9b59b6",
      "Ultrabook": "#16a085"
    };
    return colors[type] || "#7f8c8d";
  };

  const handleBuyNow = (product) => {
    if (!user) {
      setSelectedProduct(product);
      setIsLoginModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  // ✅ استخدام الدالة من Context بدلاً من الدالة المحلية
  const addToCart = (product) => {
    addToPanier(product); // ✅ هذه من Context
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
  };

  // ❌ احذف هذه الدوال المحلية - أصبحت غير ضرورية
  /*
  const updateQuantity = (id, change) => {
    // ...
  };

  const removeFromPanier = (id) => {
    // ...
  };

  const calculateTotal = () => {
    // ...
  };
  */

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
    // ❌ لا تضف setPanier([]) هنا - دع Context يتولى ذلك
  };

  // ✅ استخدام panier من Context
  const cartCount = panier.reduce((total, item) => total + item.quantity, 0);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      padding: "0",
      position: "relative"
    }}>
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        backgroundColor: "white",
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
        marginBottom: "30px",
        position: "relative",
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: "1.8rem",
          color: "#2c3e50",
          fontWeight: "700",
          margin: 0
        }}>
          PCStore
        </h1>
        
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* User Info */}
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#2c3e50", fontWeight: "500" }}>
                Welcome, {user.displayName || user.email}!
              </span>
              <button 
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem"
                }}
              >
                Logout
              </button>
            </div>
          )}

          {/* Login Button */}
          {!user && (
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem"
              }}
            >
              Login
            </button>
          )}

          {/* Cart Icon */}
          <div 
            style={{
              position: "relative",
              cursor: "pointer",
              padding: "10px",
              zIndex: 1002
            }}
            onClick={() => setShowPanier(true)}
          >
            <span style={{ fontSize: "1.5rem" }}>🛒</span>
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: "0",
                right: "0",
                backgroundColor: "#e74c3c",
                color: "white",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: cartAnimation ? "scale(1.3)" : "scale(1)",
                transition: "transform 0.3s ease",
                fontWeight: "bold"
              }}>
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ✅ السلة - تمرير الدوال من Context */}
      <Cart 
  showPanier={showPanier} 
  setShowPanier={setShowPanier} 
/>

      

      {/* باقي كود PCStore بدون تغيير */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 20px",
        position: "relative",
        zIndex: 1
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2.2rem",
          color: "#2c3e50",
          marginBottom: "10px",
          fontWeight: "300"
        }}>
          Discover Our Premium Laptops
        </h2>
        <p style={{
          textAlign: "center",
          color: "#7f8c8d",
          fontSize: "1.1rem",
          marginBottom: "40px"
        }}>
          {products.length} high-performance models available
          {!user && " - Login to make purchases"}
        </p>

        {/* عرض المنتجات */}
        <div style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {products.map((laptop) => (
            <div 
              key={laptop.id}
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                width: "280px",
                minHeight: "520px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
              }}
            >
              {/* Type Badge */}
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: getTypeColor(laptop.type),
                color: "white",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: "600"
              }}>
                {laptop.type}
              </div>

              {/* Laptop Image */}
              <div style={{
                textAlign: "center",
                marginBottom: "20px",
                flex: "0 0 auto"
              }}>
                <img 
                  src={laptop.image} 
                  alt={laptop.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "contain",
                    borderRadius: "12px"
                  }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/250x160/f8f9fa/666666?text=${encodeURIComponent(laptop.name)}`;
                  }}
                />
              </div>

              {/* Laptop Info */}
              <div style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                <h3 style={{
                  fontSize: "1.2rem",
                  color: "#2c3e50",
                  margin: "0",
                  fontWeight: "600",
                  lineHeight: "1.3"
                }}>
                  {laptop.name}
                </h3>

                <div style={{
  fontSize: "1.4rem",
  color: "#e74c3c",
  fontWeight: "700"
}}>
  {laptop.price} DA
</div>

                {/* Features */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "12px"
                }}>
                  {laptop.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      style={{
                        backgroundColor: "#ecf0f1",
                        color: "#2c3e50",
                        padding: "3px 8px",
                        borderRadius: "10px",
                        fontSize: "0.7rem",
                        fontWeight: "500"
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Specifications */}
                <div style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px"
                }}>
                  {Object.entries(laptop.specs).slice(0, 3).map(([key, value]) => (
                    <div 
                      key={key}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "4px 0",
                        borderBottom: "1px solid #f1f2f6"
                      }}
                    >
                      <span style={{
                        fontSize: "0.75rem",
                        color: "#7f8c8d",
                        fontWeight: "500",
                        textTransform: "capitalize"
                      }}>
                        {key}:
                      </span>
                      <span style={{
                        fontSize: "0.75rem",
                        color: "#2c3e50",
                        fontWeight: "600",
                        textAlign: "right"
                      }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "auto"
                }}>
                  <button 
                    onClick={() => addToCart(laptop)}
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
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleBuyNow(laptop)}
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
            </div>
          ))}
        </div>
      </div>

      {/* مودال تسجيل الدخول */}
      <ModalLogin 
        isOpen={isLoginModalOpen} 
        onRequestClose={() => {
          setIsLoginModalOpen(false);
          setSelectedProduct(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "40px 20px",
        marginTop: "50px",
        backgroundColor: "#2c3e50",
        color: "white"
      }}>
        <p style={{ margin: 0, fontSize: "1rem" }}>
          © 2024 PCStore — All Rights Reserved
        </p>
        <p style={{ margin: "10px 0 0 0", fontSize: "0.9rem", color: "#bdc3c7" }}>
          {user ? `Logged in as: ${user.email}` : "Please login to make purchases"}
        </p>
      </footer>
    </div>
  );
};

export default PCStore;