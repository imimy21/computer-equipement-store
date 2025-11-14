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
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
      description: "Premium mid-tower case with tempered glass and RGB lighting",
      features: ["Tempered Glass", "RGB Lighting", "USB-C", "Cable Management"],
      specs: {
        formFactor: "Mid-Tower ATX",
        material: "Steel & Tempered Glass",
        fans: "2x 120mm RGB",
        expansion: "7 Slots"
      },
      rating: 4.6
    },
    {
      id: 2,
      name: "Corsair 4000D Airflow",
      type: "Mid-Tower",
      price: 12500,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
      description: "High-airflow mid-tower case with modern design and excellent cooling",
      features: ["High Airflow", "Dust Filters", "Cable Management", "Tool-free"],
      specs: {
        formFactor: "Mid-Tower ATX",
        material: "Steel & Mesh",
        fans: "2x 120mm",
        expansion: "7 Slots"
      },
      rating: 4.5
    },
    {
      id: 3,
      name: "Lian Li O11 Dynamic",
      type: "Full-Tower",
      price: 18500,
      image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=300&fit=crop",
      description: "Dual-chamber full-tower case with exceptional water cooling support",
      features: ["Dual Chamber", "Water Cooling", "Tempered Glass", "Modular"],
      specs: {
        formFactor: "Full-Tower",
        material: "Aluminum & Glass",
        fans: "Support 9x 120mm",
        expansion: "8 Slots"
      },
      rating: 4.8
    },
    {
      id: 4,
      name: "Fractal Design Meshify C",
      type: "Compact",
      price: 11500,
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
      description: "Compact mid-tower with mesh front panel for optimal airflow",
      features: ["Mesh Front", "Compact Design", "Dust Filters", "Sound Dampening"],
      specs: {
        formFactor: "Compact Mid-Tower",
        material: "Steel & Mesh",
        fans: "2x 120mm",
        expansion: "7 Slots"
      },
      rating: 4.4
    },
    {
      id: 5,
      name: "Cooler Master MasterBox Q300L",
      type: "Mini-Tower",
      price: 8500,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
      description: "Versatile mini-tower case with customizable magnetic design",
      features: ["Magnetic Design", "Customizable", "Compact", "Tool-free"],
      specs: {
        formFactor: "Mini-Tower mATX",
        material: "Acrylic & Steel",
        fans: "1x 120mm",
        expansion: "4 Slots"
      },
      rating: 4.2
    },
    {
      id: 6,
      name: "Phanteks Eclipse P400A",
      type: "Mid-Tower",
      price: 13500,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
      description: "High-performance mid-tower with mesh front panel and RGB",
      features: ["Mesh Front", "RGB Ready", "Great Airflow", "Cable Management"],
      specs: {
        formFactor: "Mid-Tower ATX",
        material: "Steel & Mesh",
        fans: "3x 120mm RGB",
        expansion: "7 Slots"
      },
      rating: 4.7
    },
    {
      id: 7,
      name: "Thermaltake Core P3",
      type: "Open Frame",
      price: 16500,
      image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=300&fit=crop",
      description: "Open frame chassis for showcase builds and maximum customization",
      features: ["Open Frame", "Wall Mountable", "Showcase Build", "Modular"],
      specs: {
        formFactor: "Open Frame ATX",
        material: "Tempered Glass & Steel",
        fans: "Support 4x 120mm",
        expansion: "7 Slots"
      },
      rating: 4.3
    },
    {
      id: 8,
      name: "be quiet! Pure Base 500DX",
      type: "Mid-Tower",
      price: 14200,
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
      description: "Silent optimized case with RGB lighting and excellent airflow",
      features: ["Silent Optimized", "RGB Lighting", "Good Airflow", "Sound Dampening"],
      specs: {
        formFactor: "Mid-Tower ATX",
        material: "Steel & Mesh",
        fans: "3x 120mm",
        expansion: "7 Slots"
      },
      rating: 4.6
    },
    {
      id: 9,
      name: "NZXT H210i",
      type: "Mini-ITX",
      price: 12800,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop",
      description: "Compact Mini-ITX case with smart device and clean aesthetics",
      features: ["Mini-ITX", "Smart Device", "Cable Management", "Tempered Glass"],
      specs: {
        formFactor: "Mini-ITX",
        material: "Steel & Tempered Glass",
        fans: "2x 120mm",
        expansion: "3 Slots"
      },
      rating: 4.4
    },
    {
      id: 10,
      name: "Corsair iCUE 5000X RGB",
      type: "Full-Tower",
      price: 22500,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
      description: "Premium full-tower with tempered glass and extensive RGB lighting",
      features: ["Tempered Glass", "RGB Lighting", "Spacious", "Cable Management"],
      specs: {
        formFactor: "Full-Tower ATX",
        material: "Steel & Tempered Glass",
        fans: "3x 120mm RGB",
        expansion: "8 Slots"
      },
      rating: 4.8
    }
  ];

  // Simulate user state
  useEffect(() => {
    const mockUser = localStorage.getItem('user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
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

  const handleBuyNow = (caseItem) => {
    if (!user) {
      setSelectedProduct(caseItem);
      setIsLoginModalOpen(true);
    } else {
      addToCart(caseItem);
    }
  };

  // ✅ Using function from Context
  const addToCart = (caseItem) => {
    addToPanier(caseItem);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
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
                    objectFit: "cover",
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
                  {Object.entries(caseItem.specs).slice(0, 3).map(([key, value]) => (
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