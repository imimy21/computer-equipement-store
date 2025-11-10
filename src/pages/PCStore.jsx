import React, { useState } from 'react';

const LaptopStore = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  const laptops = [
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      price: 2799.00,
      image: "https://webstar-electro.com/documents/document_service_21038_698_5_1473342992.jpg",
      type: "Apple",
      features: ["M3 Pro Chip", "18GB RAM", "512GB SSD", "Liquid Retina XDR"],
      specs: {
        display: "16.2-inch Liquid Retina XDR",
        processor: "Apple M3 Pro 12-core",
        memory: "18GB Unified Memory",
        storage: "512GB SSD Storage",
        battery: "Up to 22 hours"
      }
    },
    {
      id: 2,
      name: "Dell XPS 15",
      price: 1999.00,
      image: "https://www.acomputerservice.com.pe/5148/notebook-dell-latitude-14-3420-14-hd-i5-1135g7-24ghz-8gb-ddr4-3200mhz-512gb-ssd-kw11n.jpg",
      type: "Windows",
      features: ["Intel i9", "32GB RAM", "1TB SSD", "OLED Display"],
      specs: {
        display: "15.6-inch 4K OLED Touch",
        processor: "Intel Core i9-13900H",
        memory: "32GB DDR5 RAM",
        storage: "1TB NVMe SSD",
        battery: "Up to 10 hours"
      }
    },
    {
      id: 3,
      name: "HP Spectre x360",
      price: 1499.00,
      image: "https://www.elasslihitech.com/wp-content/uploads/2023/11/LD0005638889_2.jpg",
      type: "2-in-1",
      features: ["Intel i7", "16GB RAM", "512GB SSD", "Touchscreen"],
      specs: {
        display: "13.5-inch OLED Touch",
        processor: "Intel Core i7-1355U",
        memory: "16GB LPDDR5 RAM",
        storage: "512GB SSD",
        battery: "Up to 12 hours"
      }
    },
    {
      id: 4,
      name: "Lenovo ThinkPad X1",
      price: 1699.00,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnYpGL794F6wpnWEm1-eWaR2NqqfkUytjESFzxgFaU8jxVcc4Pe8F3MdtrViqt9Qq7lg&usqp=CAU",
      type: "Business",
      features: ["Intel i7", "16GB RAM", "1TB SSD", "Military Grade"],
      specs: {
        display: "14-inch 2.8K OLED",
        processor: "Intel Core i7-1365U",
        memory: "16GB LPDDR5",
        storage: "1TB SSD",
        battery: "Up to 15 hours"
      }
    }
  ];

  const handleAddToCart = (laptop) => {
    setCartCount(prevCount => prevCount + 1);
    setShowNotification(true);
    setCartAnimation(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
    
    setTimeout(() => {
      setCartAnimation(false);
    }, 300);
  };

  const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="#2c3e50">
      <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.616-2.254L6 6h14v2H7.414l-2.03 7.246c-.096.34.07.69.408.81.128.056.272.084.416.084h11v-2H7.768l.132-.466z"/>
    </svg>
  );

  const Notification = ({ show, message }) => (
    <div style={{
      position: "fixed",
      top: "100px",
      right: "20px",
      backgroundColor: "#27ae60",
      color: "white",
      padding: "15px 25px",
      borderRadius: "12px",
      boxShadow: "0 8px 25px rgba(39, 174, 96, 0.3)",
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(-20px)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      zIndex: 1000,
      fontSize: "1rem",
      fontWeight: "600"
    }}>
      {message}
    </div>
  );

  const getTypeColor = (type) => {
    const colors = {
      "Apple": "#0070c9",
      "Windows": "#0078d4",
      "2-in-1": "#e67e22",
      "Business": "#c0392b"
    };
    return colors[type] || "#7f8c8d";
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      padding: "0"
    }}>
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        backgroundColor: "white",
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
        marginBottom: "30px"
      }}>
        <h1 style={{
          fontSize: "1.8rem",
          color: "#2c3e50",
          fontWeight: "700",
          margin: 0
        }}>
          Laptop Store
        </h1>
        <div style={{
          position: "relative",
          cursor: "pointer",
          padding: "10px"
        }}>
          <CartIcon />
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
      </header>

      <Notification show={showNotification} message="Laptop added to cart!" />

      {/* Main Container */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 20px"
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
          {laptops.length} high-performance models available
        </p>

        {/* Laptops Grid - 4 DANS UN SEUL LIGNE */}
        <div style={{
          display: "flex",
          gap: "25px",
          justifyContent: "space-between",
          marginBottom: "50px",
          flexWrap: "nowrap",
          overflowX: "auto",
          padding: "10px 0"
        }}>
          {laptops.map((laptop) => (
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
                minHeight: "480px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                flex: "0 0 auto"
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
                  ${laptop.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(laptop)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    marginTop: "auto"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#2980b9";
                    e.target.style.transform = "scale(1.02)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#3498db";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "40px 20px",
        marginTop: "50px",
        backgroundColor: "#2c3e50",
        color: "white"
      }}>
        <p style={{ margin: 0, fontSize: "1rem" }}>
          © 2024 Laptop Store. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LaptopStore;