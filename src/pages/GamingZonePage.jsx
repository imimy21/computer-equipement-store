import React, { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";
import Cart from "./cart";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const GamingZonePage = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPanier, setShowPanier] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);

  // ✅ Using global cart from Context
  const { panier, addToPanier, updateQuantity, removeFromPanier, total } = useCart();

  // Gaming Products data
  const gamingProducts = [
    {
      id: 1,
      name: "Razer BlackWidow V3",
      type: "Mechanical Keyboard",
      price: 12500,
      image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "Professional mechanical gaming keyboard with RGB lighting",
      features: ["Mechanical Switches", "RGB Lighting", "Programmable Keys", "Wrist Rest"],
      specs: {
        switches: "Razer Green Mechanical",
        backlight: "RGB Chroma",
        connectivity: "USB",
        keys: "104 Keys"
      },
      rating: 4.7
    },
    {
      id: 2,
      name: "Logitech G502 Hero",
      type: "Gaming Mouse",
      price: 8500,
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "High-precision gaming mouse with customizable weights",
      features: ["High DPI", "Customizable Weights", "11 Programmable Buttons", "RGB"],
      specs: {
        sensor: "HERO 25K",
        dpi: "25600 DPI",
        buttons: "11 Programmable",
        weight: "Adjustable"
      },
      rating: 4.6
    },
    {
      id: 3,
      name: "SteelSeries Arctis Pro",
      type: "Gaming Headset",
      price: 16800,
      image: "https://images.pexels.com/photos/3945660/pexels-photo-3945660.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "Premium gaming headset with high-resolution audio",
      features: ["Hi-Res Audio", "DTS Headphone", "ClearCast Mic", "RGB Illumination"],
      specs: {
        drivers: "40mm Neodymium",
        frequency: "10-40000 Hz",
        connectivity: "3.5mm + USB",
        microphone: "Retractable"
      },
      rating: 4.8
    },
   {
  id: 4,
  name: "Xbox Series X Controller",
  type: "Game Controller",
  price: 7500,
  image: "https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
  description: "Wireless controller for Xbox Series X|S and Windows",
  features: ["Wireless", "Textured Grip", "Share Button", "Bluetooth"],
  specs: {
    connectivity: "Bluetooth & Wireless",
    battery: "AA x2",
    compatibility: "Xbox & Windows",
    buttons: "Customizable"
  },
  rating: 4.5
},
    {
      id: 5,
      name: "PlayStation DualSense",
      type: "Game Controller",
      price: 8900,
image: "https://images.pexels.com/photos/8439062/pexels-photo-8439062.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "Wireless controller for PS5 with haptic feedback",
      features: ["Haptic Feedback", "Adaptive Triggers", "Built-in Mic", "Touch Pad"],
      specs: {
        connectivity: "Bluetooth & USB-C",
        battery: "Built-in Rechargeable",
        features: "Haptic Feedback",
        compatibility: "PS5 & PC"
      },
      rating: 4.7
    },
    {
      id: 6,
      name: "Corsair MM300",
      type: "Gaming Mousepad",
      price: 3200,
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "Extended gaming mousepad with optimized surface",
      features: ["Extended Size", "Anti-Fray Cloth", "Optimized Surface", "Non-Slip Base"],
      specs: {
        size: "930x300x3mm",
        material: "High-quality cloth",
        base: "Rubber non-slip",
        design: "Stitched edges"
      },
      rating: 4.4
    },
    {
      id: 7,
      name: "Nintendo Switch Pro",
      type: "Game Controller",
      price: 6800,
      image: "https://images.pexels.com/photos/1637436/pexels-photo-1637436.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "Professional controller for Nintendo Switch",
      features: ["Motion Controls", "HD Rumble", "Amiibo Support", "Wireless"],
      specs: {
        connectivity: "Wireless & USB-C",
        battery: "40 hours",
        features: "Motion Controls",
        compatibility: "Nintendo Switch"
      },
      rating: 4.6
    },
   {
  id: 8,
  name: "HyperX Cloud Flight",
  type: "Wireless Headset",
  price: 14200,
  image: "https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
  description: "Wireless gaming headset with long battery life",
  features: ["Wireless Freedom", "30h Battery", "Noise Cancellation", "DTS Sound"],
  specs: {
    battery: "30 hours",
    connectivity: "2.4GHz Wireless",
    drivers: "50mm Neodymium",
    weight: "310g"
  },
  rating: 4.5
},
    {
      id: 9,
      name: "Razer Kraken Tournament",
      type: "Gaming Headset",
      price: 9800,
     image: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=400&h=300&fit=crop",
      description: "THX Spatial Audio gaming headset with cooling gel",
      features: ["THX Spatial Audio", "Cooling Gel", "Noise Cancelling Mic", "RGB"],
      specs: {
        audio: "THX Spatial Audio",
        comfort: "Cooling Gel-infused",
        microphone: "Retractable",
        connectivity: "3.5mm + USB"
      },
      rating: 4.3
    },
    {
      id: 10,
      name: "SteelSeries QcK Heavy",
      type: "Gaming Mousepad",
      price: 4500,
image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
      description: "XXL thick gaming mousepad for precision control",
      features: ["6mm Thickness", "Non-Slip Rubber", "Optimized Surface", "Durable"],
      specs: {
        thickness: "6mm",
        size: "450x400mm",
        surface: "Micro-woven cloth",
        base: "Natural rubber"
      },
      rating: 4.7
    },
    {
      id: 11,
      name: "Corsair K95 RGB Platinum",
      type: "Mechanical Keyboard",
      price: 18500,
      image: "https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      description: "Premium mechanical keyboard with Cherry MX switches",
      features: ["Cherry MX Speed", "Aircraft-grade Aluminum", "Dynamic RGB", "Macro Keys"],
      specs: {
        switches: "Cherry MX Speed",
        construction: "Aircraft-grade aluminum",
        lighting: "Dynamic RGB per key",
        extras: "6 dedicated macro keys"
      },
      rating: 4.8
    },
    {
      id: 12,
      name: "Razer Viper Ultimate",
      type: "Wireless Mouse",
      price: 12800,
image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop",
      description: "Lightweight wireless gaming mouse with hyperspeed",
      features: ["Wireless", "74g Lightweight", "Optical Switches", "Charging Dock"],
      specs: {
        weight: "74g",
        sensor: "Focus+ Optical",
        battery: "70 hours",
        switches: "Optical Mouse"
      },
      rating: 4.6
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
      "Mechanical Keyboard": "#3498db",
      "Gaming Mouse": "#e74c3c",
      "Gaming Headset": "#9b59b6",
      "Game Controller": "#27ae60",
      "Wireless Headset": "#f39c12",
      "Gaming Mousepad": "#1abc9c"
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

  // ✅ Using function from Context
  const addToCart = (product) => {
    addToPanier(product);
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
          Gaming Zone
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
          Premium Gaming Products
        </h2>
        <p style={{
          textAlign: "center",
          color: "#7f8c8d",
          fontSize: "1.1rem",
          marginBottom: "40px"
        }}>
          {gamingProducts.length} gaming products available
          {!user && " - Login to make purchases"}
        </p>

        {/* Display Gaming Products */}
        <div style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {gamingProducts.map((product) => (
            <div 
              key={product.id}
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
                backgroundColor: getTypeColor(product.type),
                color: "white",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: "600"
              }}>
                {product.type}
              </div>

              {/* Product Image */}
              <div style={{
                textAlign: "center",
                marginBottom: "20px",
                flex: "0 0 auto"
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "12px"
                  }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/250x160/f8f9fa/666666?text=${encodeURIComponent(product.name)}`;
                  }}
                />
              </div>

              {/* Product Info */}
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
                  {product.name}
                </h3>

                <div style={{
                  fontSize: "1.4rem",
                  color: "#e74c3c",
                  fontWeight: "700"
                }}>
                  {product.price.toLocaleString()} DA
                </div>

                <p style={{
                  fontSize: "0.85rem",
                  color: "#7f8c8d",
                  margin: "0",
                  lineHeight: "1.4"
                }}>
                  {product.description}
                </p>

                {/* Features */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "12px"
                }}>
                  {product.features.slice(0, 3).map((feature, idx) => (
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
                  {product.features.length > 3 && (
                    <span style={{
                      backgroundColor: "#bdc3c7",
                      color: "white",
                      padding: "3px 8px",
                      borderRadius: "10px",
                      fontSize: "0.7rem",
                      fontWeight: "500"
                    }}>
                      +{product.features.length - 3}
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
                  {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
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
                    {product.rating}/5
                  </span>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "auto"
                }}>
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
          Your ultimate destination for premium gaming equipment
          {user ? ` - Logged in as: ${user.email}` : " - Login to make purchases"}
        </p>
      </footer>
    </div>
  );
};

export default GamingZonePage;