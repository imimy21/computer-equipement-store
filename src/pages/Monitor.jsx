import React, { useState, useEffect } from "react";
import ModalLogin from "./ModalLogin";
import Cart from "./cart";
import { useCart } from "../context/CartContext";
//import "./MonitorPage.css";

const MonitorPage = () => {
  const [monitors] = useState([
    {
      id: 1,
      name: 'Dell UltraSharp 27"',
      price:  40350,
      resolution: '2560x1440 QHD',
      refreshRate: '60Hz',
      panelType: 'IPS',
      image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u2724d/media-gallery/monitor-ultrasharp-u2724d-qhd-gy-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=914&qlt=100,1&resMode=sharp2&size=914,804&chrss=full',
      features: ['QHD Resolution', '60Hz Refresh Rate', 'IPS Panel'],
      specs: {
        display: '27" QHD IPS',
        resolution: '2560x1440',
        refreshRate: '60Hz'
      }
    },
    {
      id: 2,
      name: 'Samsung Odyssey 32"',
      price: 60550,
      resolution: '3840x2160 4K',
      refreshRate: '144Hz',
      panelType: 'VA',
      image: 'https://images.samsung.com/is/image/samsung/fr-odyssey-g5-g95t-lc32g55tqwuxen-frontblack-thumb-310786532',
      features: ['4K Resolution', '144Hz Refresh Rate', 'VA Panel'],
      specs: {
        display: '32" 4K VA',
        resolution: '3840x2160',
        refreshRate: '144Hz'
      }
    },
    {
      id: 3,
      name: 'LG UltraGear 27"',
      price: 53800,
      resolution: '2560x1440 QHD',
      refreshRate: '165Hz',
      panelType: 'Nano IPS',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyZEUeqSp1TGG6nNnVXLoYNru4qtrbPqcVgA&s',
      features: ['QHD Resolution', '165Hz Refresh Rate', 'Nano IPS'],
      specs: {
        display: '27" QHD Nano IPS',
        resolution: '2560x1440',
        refreshRate: '165Hz'
      }
    },
    {
      id: 4,
      name: 'ASUS TUF Gaming 24"',
      price:  26900,
      resolution: '1920x1080 FHD',
      refreshRate: '144Hz',
      panelType: 'IPS',
      image: 'https://click-dz.com/wp-content/uploads/2024/01/asus24.jpg',
      features: ['FHD Resolution', '144Hz Refresh Rate', 'Gaming IPS'],
      specs: {
        display: '24" FHD IPS',
        resolution: '1920x1080',
        refreshRate: '144Hz'
      }
    },
    {
      id: 5,
      name: 'Acer Predator 34"',
      price: 107600,
      resolution: '3440x1440 UWQHD',
      refreshRate: '180Hz',
      panelType: 'IPS',
      image: 'https://i.ebayimg.com/images/g/Q2cAAOSwzw5jjWL2/s-l400.jpg',
      features: ['UltraWide QHD', '180Hz Refresh Rate', 'Curved IPS'],
      specs: {
        display: '34" UWQHD Curved',
        resolution: '3440x1440',
        refreshRate: '180Hz'
      }
    },
    {
      id: 6,
      name: 'HP Pavilion 27"',
      price:  30900,
      resolution: '1920x1080 FHD',
      refreshRate: '75Hz',
      panelType: 'IPS',
      image: 'https://media.ldlc.com/r1600/ld/products/00/05/36/40/LD0005364080_2.jpg',
      features: ['FHD Resolution', '75Hz Refresh Rate', 'IPS Display'],
      specs: {
        display: '27" FHD IPS',
        resolution: '1920x1080',
        refreshRate: '75Hz'
      }
    }
  ]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPanier, setShowPanier] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [cartAnimation, setCartAnimation] = useState(false);

  const { panier, addToPanier } = useCart();

  // تقسيم المونيتورات إلى مجموعتين (3 فوق و3 تحت)
  const topMonitors = monitors.slice(0, 4);
  const bottomMonitors = monitors.slice(4, 6);

  // محاكاة حالة المستخدم (بدلاً من Firebase)
  useEffect(() => {
    const mockUser = localStorage.getItem('user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
  }, []);

  const getTypeColor = (panelType) => {
    const colors = {
      "IPS": "#0070c9",
      "VA": "#0078d4", 
      "Nano IPS": "#e67e22",
      "Gaming": "#c0392b"
    };
    return colors[panelType] || "#7f8c8d";
  };

  const handleBuyNow = (monitor) => {
    if (!user) {
      setSelectedMonitor(monitor);
      setIsLoginModalOpen(true);
    } else {
      addToCart(monitor);
    }
  };

  const addToCart = (monitor) => {
    addToPanier(monitor);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 300);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    const mockUser = { displayName: "User", email: "user@example.com" };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    if (selectedMonitor) {
      addToCart(selectedMonitor);
      setSelectedMonitor(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

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
          MonitorStore
        </h1>
        
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* User Info */}
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#2c3e50", fontWeight: "500" }}>
                Welcome, {user.displayName}!
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

      {/* السلة */}
      <Cart 
        showPanier={showPanier} 
        setShowPanier={setShowPanier} 
      />

      {/* محتوى الشاشات */}
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
          Discover Our Premium Monitors
        </h2>
        <p style={{
          textAlign: "center",
          color: "#7f8c8d",
          fontSize: "1.1rem",
          marginBottom: "40px"
        }}>
          {monitors.length} high-quality monitors available
          {!user && " - Login to make purchases"}
        </p>

        {/* المونيتورات العلوية */}
        <h3 style={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "#3498db",
          marginBottom: "30px",
          fontWeight: "400"
        }}>
         
        </h3>
        <div style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "50px"
        }}>
          {topMonitors.map((monitor) => (
            <MonitorCard 
              key={monitor.id}
              monitor={monitor}
              user={user}
              getTypeColor={getTypeColor}
              addToCart={addToCart}
              handleBuyNow={handleBuyNow}
            />
          ))}
        </div>

        {/* المونيتورات السفلية */}
        <h3 style={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "#3498db",
          marginBottom: "30px",
          fontWeight: "400"
        }}>
    
        </h3>
        <div style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "30px"
        }}>
          {bottomMonitors.map((monitor) => (
            <MonitorCard 
              key={monitor.id}
              monitor={monitor}
              user={user}
              getTypeColor={getTypeColor}
              addToCart={addToCart}
              handleBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </div>

      {/* مودال تسجيل الدخول */}
      <ModalLogin 
        isOpen={isLoginModalOpen} 
        onRequestClose={() => {
          setIsLoginModalOpen(false);
         setSelectedMonitor(null);
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
          © 2024 MonitorStore — All Rights Reserved
        </p>
        <p style={{ margin: "10px 0 0 0", fontSize: "0.9rem", color: "#bdc3c7" }}>
          {user ? `Logged in as: ${user.email}` : "Please login to make purchases"}
        </p>
      </footer>
    </div>
  );
};

// مكون منفصل لبطاقة المونيتور
const MonitorCard = ({ monitor, user, getTypeColor, addToCart, handleBuyNow }) => {
  return (
    <div 
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
        backgroundColor: getTypeColor(monitor.panelType),
        color: "white",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "0.8rem",
        fontWeight: "600"
      }}>
        {monitor.panelType}
      </div>

      {/* Monitor Image */}
      <div style={{
        textAlign: "center",
        marginBottom: "20px",
        flex: "0 0 auto"
      }}>
        <img 
          src={monitor.image} 
          alt={monitor.name}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "contain",
            borderRadius: "12px"
          }}
        />
      </div>

      {/* Monitor Info */}
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
          {monitor.name}
        </h3>

       <div style={{
  fontSize: "1.4rem",
  color: "#e74c3c",
  fontWeight: "700"
}}>
  {monitor.price} DA
</div>

        {/* Features */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "12px"
        }}>
          {monitor.features.map((feature, idx) => (
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
          {Object.entries(monitor.specs).slice(0, 3).map(([key, value]) => (
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
    </div>
  );
};

export default MonitorPage;