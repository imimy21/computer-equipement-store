import React, { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";
import Cart from "./cart";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ComputerCasesPage = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPanier, setShowPanier] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);

  // ✅ Using global cart from Context
  const { panier, addToPanier, updateQuantity, removeFromPanier, total } = useCart();

  // Computer Cases data
  const computerCases = [
    {
      id: 1,
      name: "NZXT H510 Elite",
      type: "Mid-Tower",
      price: 14500,
      image: "https://store974.com/cdn/shop/products/NewProject-2022-03-22T115524.437.jpg?v=1648536997",
      description: "Premium mid-tower case with tempered glass and RGB lighting",
      features: ["Tempered Glass", "RGB Lighting", "USB-C", "Cable Management"],
      specs: "Mid-Tower ATX / Steel & Tempered Glass / 2x 120mm RGB / 7 Slots",
      rating: 4.6
    },
    {
      id: 2,
      name: "Corsair 4000D Airflow",
      type: "Mid-Tower",
      price: 12500,
      image: "https://www.geekzonedz.com/3965-large_default/corsair-4000d-airflow-tempered-glass-blanc.jpg",
      description: "High-airflow mid-tower case with modern design and excellent cooling",
      features: ["High Airflow", "Dust Filters", "Cable Management", "Tool-free"],
      specs:"Mid-Tower ATX / Steel & Mesh / 2x 120mm / 7 Slots",
       
      rating: 4.5
    },
    {
      id: 3,
      name: "Lian Li O11 Dynamic",
      type: "Full-Tower",
      price: 18500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPGr_sH2etUb7pNKTXT9DCBNSciTrLBHZUMw&s",
      description: "Dual-chamber full-tower case with exceptional water cooling support",
      features: ["Dual Chamber", "Water Cooling", "Tempered Glass", "Modular"],
      specs: "Full-Tower / Aluminum & Glass / Support 9x 120mm / 8 Slots",
      
      rating: 4.8
    },
    {
      id: 4,
      name: "Fractal Design Meshify C",
      type: "Compact",
      price: 11500,
      image: "data:image/jpeg;base64,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",
      description: "Compact mid-tower with mesh front panel for optimal airflow",
      features: ["Mesh Front", "Compact Design", "Dust Filters", "Sound Dampening"],
      specs: "Compact Mid-Tower / Steel & Mesh / 2x 120mm / 7 Slots ",
      
      rating: 4.4
    },
    {
      id: 5,
      name: "Cooler Master MasterBox Q300L",
      type: "Mini-Tower",
      price: 8500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH4yGSNLlPYJsVItE9IALQvw6z67EQVRd0qQ&s",
      description: "Versatile mini-tower case with customizable magnetic design",
      features: ["Magnetic Design", "Customizable", "Compact", "Tool-free"],
      specs: " Mini-Tower mATX  / Acrylic & Steel / 1x 120mm / 4 Slots ",
      
      rating: 4.2
    },
    {
      id: 6,
      name: "Phanteks Eclipse P400A",
      type: "Mid-Tower",
      price: 13500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJfEaiC5vUXKv2QWskcaYiv3wtNrTO_jncA&s",
      description: "High-performance mid-tower with mesh front panel and RGB",
      features: ["Mesh Front", "RGB Ready", "Great Airflow", "Cable Management"],
      specs: " Mid-Tower ATX / Steel & Mesh / 3x 120mm RGB / 7 Slots ",
      
      rating: 4.7
    },
  
  ];

  // Simulate user state
  useEffect(() => {
           // غير 'user' إلى 'userData'
           const savedUser = localStorage.getItem('userData');
           if (savedUser) {
             setUser(JSON.parse(savedUser));
           }
         }, []);

  const getTypeColor = (type) => {
    const colors = {
      "Mid-Tower": "#3498db",
      "Full-Tower": "#e74c3c",
      "Mini-Tower": "#9b59b6",
      "Compact": "#27ae60",
      "Mini-ITX": "#f39c12",
      "Open Frame": "#1abc9c"
    };
    return colors[type] || "#7f8c8d";
  };

   const handleBuyNow = (product) => {
  if (!user) {
    setSelectedMonitor(product); // ✅ Correct variable name
    setIsLoginModalOpen(true);
  } else {
    navigate("/payment", { state: { product } });
  }
};

  const addToCart = (product) => {
          addToPanier(product);
          setCartAnimation(true);
          setTimeout(() => setCartAnimation(false), 300);
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


  // ✅ Using panier from Context
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
        <button 
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#2c3e50",
            padding: "8px"
          }}
        >
          ←
        </button>
        
        <h1 style={{
          fontSize: "1.8rem",
          color: "#2c3e50",
          fontWeight: "700",
          margin: 0
        }}>
          Computer Cases
        </h1>
        
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* User Info */}
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              
            
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

      {/* ✅ Cart */}
      <Cart 
        showPanier={showPanier} 
        setShowPanier={setShowPanier} 
      />

      {/* Page Content */}
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
          Premium Computer Cases
        </h2>
        <p style={{
          textAlign: "center",
          color: "#7f8c8d",
          fontSize: "1.1rem",
          marginBottom: "40px"
        }}>
          {computerCases.length} models available
          {!user && " - Login to make purchases"}
        </p>

        {/* Display Computer Cases */}
        <div style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {computerCases.map((caseItem) => (
            <div 
              key={caseItem.id}
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
                backgroundColor: getTypeColor(caseItem.type),
                color: "white",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: "600"
              }}>
                {caseItem.type}
              </div>

              {/* Case Image */}
              <div style={{
                textAlign: "center",
                marginBottom: "20px",
                flex: "0 0 auto"
              }}>
                <img 
                  src={caseItem.image} 
                  alt={caseItem.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "contain",
                    borderRadius: "12px"
                  }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/250x160/f8f9fa/666666?text=${encodeURIComponent(caseItem.name)}`;
                  }}
                />
              </div>

              {/* Case Info */}
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
                  {caseItem.name}
                </h3>

               <div style={{
  fontSize: "1.4rem",
  color: "#e74c3c",
  fontWeight: "700"
}}>
  {caseItem.price.toLocaleString()} DA
</div>
                <p style={{
                  fontSize: "0.85rem",
                  color: "#7f8c8d",
                  margin: "0",
                  lineHeight: "1.4"
                }}>
                  {caseItem.description}
                </p>

                {/* Features */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "12px"
                }}>
                  {caseItem.features.slice(0, 3).map((feature, idx) => (
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
                  {caseItem.features.length > 3 && (
                    <span style={{
                      backgroundColor: "#bdc3c7",
                      color: "white",
                      padding: "3px 8px",
                      borderRadius: "10px",
                      fontSize: "0.7rem",
                      fontWeight: "500"
                    }}>
                      +{caseItem.features.length - 3}
                    </span>
                  )}
                </div>

                {/* Specifications */}
<div style={{
  flex: "1",
  display: "flex",
  flexDirection: "column",
  gap: "6px"
}}>
  {caseItem.specs.split('/').map((spec, idx) => (
    <div 
      key={idx}
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
        color: "#2c3e50",
        fontWeight: "600",
        textAlign: "left",
        width: "100%"
      }}>
        {spec.trim()}
      </span>
    </div>
  ))}
</div>
                {/* Rating */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "5px"
                }}>
                  <span style={{
                    fontSize: "0.8rem",
                    color: "#f39c12",
                    fontWeight: "600"
                  }}>
                    ★
                  </span>
                  <span style={{
                    fontSize: "0.75rem",
                    color: "#7f8c8d",
                    fontWeight: "500"
                  }}>
                    {caseItem.rating}/5
                  </span>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "auto"
                }}>
                  <button 
                    onClick={() => addToCart(caseItem)}
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
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2980b9";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#3498db";
                    }}
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleBuyNow(caseItem)}
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
                    onMouseEnter={(e) => {
                      if (user) {
                        e.target.style.backgroundColor = "#219a52";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (user) {
                        e.target.style.backgroundColor = "#27ae60";
                      }
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

      {/* Login Modal */}
     <ModalLogin 
  isOpen={isLoginModalOpen}
  onRequestClose={() => {
    setIsLoginModalOpen(false);
    setSelectedProduct(null);
  }}
  onLoginSuccess={handleLoginSuccess}
  user={user}
  setUser={setUser}
  userRole={user?.role || null}  // إذا أردت تمرير الدور الحالي
  setUserRole={(role) => setUser(prev => ({ ...prev, role }))} // تحديث الدور في الـ state
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
          © 2025 CompDZ — All Rights Reserved
        </p>
        <p style={{ margin: "10px 0 0 0", fontSize: "0.9rem", color: "#bdc3c7" }}>
          Your trusted partner for premium computer components
          {user ? ` - Logged in as: ${user.email}` : " - Login to make purchases"}
        </p>
      </footer>
    </div>
  );
};

export default ComputerCasesPage;
