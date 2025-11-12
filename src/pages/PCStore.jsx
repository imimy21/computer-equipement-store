import React, { useState, useEffect } from 'react';

const PCStore = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  // Load user and cart from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('pcStoreUser');
    const savedCart = localStorage.getItem('pcStoreCart');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      setCart(cartData);
      setCartCount(cartData.reduce((total, item) => total + item.quantity, 0));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('pcStoreCart', JSON.stringify(cart));
  }, [cart]);

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
    },
    {
      id: 5,
      name: "ASUS ROG Zephyrus",
      price: 2199.00,
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
      price: 1299.00,
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
    },
    {
      id: 7,
      name: "Acer Swift 3",
      price: 899.00,
      image: "https://m.media-amazon.com/images/I/31y7FwFg2vL.jpg",
      type: "Ultrabook",
      features: ["AMD Ryzen 7", "16GB RAM", "1TB SSD", "Lightweight"],
      specs: {
        display: "14-inch FIPS IPS",
        processor: "AMD Ryzen 7 7730U",
        memory: "16GB LPDDR4X",
        storage: "1TB NVMe SSD",
        battery: "Up to 14 hours"
      }
    },
    {
      id: 8,
      name: "Razer Blade 15",
      price: 2499.00,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhRJawBSoxcVyaRUpHv31m08_kijgKXlvBphFJRxeMbVmlM99O-jbod0KaGeNYIcbSdTo&usqp=CAU",
      type: "Gaming",
      features: ["RTX 4080", "32GB RAM", "2TB SSD", "240Hz Display"],
      specs: {
        display: "15.6-inch QHD 240Hz",
        processor: "Intel Core i9-13950HX",
        memory: "32GB DDR5 RAM",
        storage: "2TB NVMe SSD",
        battery: "Up to 6 hours"
      }
    }
  ];

  // Authentication Functions
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      const userData = {
        id: 1,
        name: loginForm.email.split('@')[0],
        email: loginForm.email
      };
      setUser(userData);
      localStorage.setItem('pcStoreUser', JSON.stringify(userData));
      setShowLogin(false);
      setLoginForm({ email: '', password: '' });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (registerForm.name && registerForm.email && registerForm.password) {
      const userData = {
        id: Date.now(),
        name: registerForm.name,
        email: registerForm.email
      };
      setUser(userData);
      localStorage.setItem('pcStoreUser', JSON.stringify(userData));
      setShowRegister(false);
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pcStoreUser');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Cart Functions
  const handleAddToCart = (laptop) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === laptop.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === laptop.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...laptop, quantity: 1 }];
      }
    });
    
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

  const handleBuyNow = (laptop) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    
    // Add to cart and proceed to checkout
    handleAddToCart(laptop);
    // In a real app, you would redirect to checkout page
    alert(`Proceeding to checkout with ${laptop.name}`);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
    
    setCartCount(prevCount => {
      const item = cart.find(item => item.id === itemId);
      if (item) {
        return prevCount - item.quantity + newQuantity;
      }
      return prevCount;
    });
  };

  const handleRemoveItem = (itemId) => {
    setCart(prevCart => {
      const removedItem = prevCart.find(item => item.id === itemId);
      if (removedItem) {
        setCartCount(prevCount => prevCount - removedItem.quantity);
      }
      return prevCart.filter(item => item.id !== itemId);
    });
  };

  const handleCheckout = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Order Completed Successfully!\n\nTotal: $${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}\n\nThank you for your purchase!`);
    
    setCart([]);
    setCartCount(0);
    setShowCart(false);
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // UI Components
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

  const LoginModal = () => (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1002
  }}>
    <div style={{
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "15px",
      width: "400px",
      maxWidth: "90%"
    }}>
      <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>Login to Your Account</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          {/* إضافة تسمية فوق حقل الإيميل */}
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#2c3e50",
            fontSize: "0.9rem"
          }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          {/* إضافة تسمية فوق حقل الباسوورد */}
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#2c3e50",
            fontSize: "0.9rem"
          }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            marginBottom: "15px"
          }}
        >
          Login
        </button>
      </form>
      <p style={{ textAlign: "center", color: "#7f8c8d" }}>
        Don't have an account?{" "}
        <button
          onClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          style={{
            background: "none",
            border: "none",
            color: "#3498db",
            cursor: "pointer",
            textDecoration: "underline"
          }}
        >
          Sign up
        </button>
      </p>
      <button
        onClick={() => setShowLogin(false)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#95a5a6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Cancel
      </button>
    </div>
  </div>
);

const RegisterModal = () => (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1002
  }}>
    <div style={{
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "15px",
      width: "400px",
      maxWidth: "90%"
    }}>
      <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>Create Account</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          {/* إضافة تسمية فوق حقل الاسم */}
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#2c3e50",
            fontSize: "0.9rem"
          }}>
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={registerForm.name}
            onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          {/* إضافة تسمية فوق حقل الإيميل */}
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#2c3e50",
            fontSize: "0.9rem"
          }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={registerForm.email}
            onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          {/* إضافة تسمية فوق حقل الباسوورد */}
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#2c3e50",
            fontSize: "0.9rem"
          }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={registerForm.password}
            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          {/* إضافة تسمية فوق حقل تأكيد الباسوورد */}
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#2c3e50",
            fontSize: "0.9rem"
          }}>
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={registerForm.confirmPassword}
            onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            marginBottom: "15px"
          }}
        >
          Create Account
        </button>
      </form>
      <p style={{ textAlign: "center", color: "#7f8c8d" }}>
        Already have an account?{" "}
        <button
          onClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          style={{
            background: "none",
            border: "none",
            color: "#3498db",
            cursor: "pointer",
            textDecoration: "underline"
          }}
        >
          Login
        </button>
      </p>
      <button
        onClick={() => setShowRegister(false)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#95a5a6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Cancel
      </button>
    </div>
  </div>
);

 const CartSidebar = ({ show, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      right: show ? 0 : "-400px",
      width: "380px",
      height: "100vh",
      backgroundColor: "white",
      boxShadow: "-5px 0 25px rgba(0,0,0,0.1)",
      transition: "right 0.3s ease",
      zIndex: 1001,
      display: "flex",
      flexDirection: "column",
      padding: "20px"
    }}>
      {/* Cart Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        paddingBottom: "15px",
        borderBottom: "2px solid #ecf0f1"
      }}>
        <h3 style={{ margin: 0, color: "#2c3e50" }}>Shopping Cart</h3>
        <button 
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#7f8c8d"
          }}
        >
          ✕
        </button>
      </div>

      {/* Cart Contents */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", color: "#7f8c8d", marginTop: "50px" }}>
            Your cart is empty
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} style={{
              display: "flex",
              gap: "15px",
              padding: "15px 0",
              borderBottom: "1px solid #f1f2f6"
            }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  borderRadius: "8px"
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 5px 0", fontSize: "0.9rem", color: "#2c3e50" }}>
                  {item.name}
                </h4>
                <div style={{ fontSize: "0.9rem", color: "#e74c3c", fontWeight: "bold" }}>
                  ${item.price.toLocaleString()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #bdc3c7",
                      background: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#2c3e50"
                    }}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span style={{ 
                    fontSize: "1rem", 
                    fontWeight: "600",
                    minWidth: "30px",
                    textAlign: "center"
                  }}>
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #bdc3c7",
                      background: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#2c3e50"
                    }}
                  >
                    +
                  </button>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      marginLeft: "auto",
                      background: "none",
                      border: "1px solid #e74c3c",
                      color: "#e74c3c",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      padding: "5px 10px",
                      borderRadius: "5px"
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total and Checkout */}
      {cart.length > 0 && (
        <div style={{
          borderTop: "2px solid #ecf0f1",
          paddingTop: "15px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.1rem",
            fontWeight: "bold",
            marginBottom: "15px",
            color: "#2c3e50"
          }}>
            <span>Total:</span>
            <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <button 
            onClick={onCheckout}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#219a52";
              e.target.style.transform = "scale(1.02)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#27ae60";
              e.target.style.transform = "scale(1)";
            }}
          >
            {user ? "Proceed to Checkout" : "Login to Checkout"}
          </button>
        </div>
      )}
    </div>
  );
};
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
          PCStore
        </h1>
        
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* User Info */}
         {/* User Info - Seulement afficher quand l'utilisateur est connecté */}
{user && (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <span style={{ color: "#2c3e50", fontWeight: "500" }}>
      Welcome, {user.name}!
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

          {/* Cart Icon */}
          <div 
            style={{
              position: "relative",
              cursor: "pointer",
              padding: "10px"
            }}
            onClick={() => setShowCart(true)}
          >
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
        </div>
      </header>

      <Notification 
        show={showNotification} 
        message={
          !user ? "Please login to make purchases" :
          "Item added to cart!"
        } 
      />

      {/* Authentication Modals */}
      {showLogin && <LoginModal />}
      {showRegister && <RegisterModal />}

      {/* Shopping Cart Sidebar */}
      <CartSidebar 
        show={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Overlay when cart is open */}
      {showCart && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000
          }}
          onClick={() => setShowCart(false)}
        />
      )}

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
          {!user && " - Login to make purchases"}
        </p>

        {/* Laptops Grid */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          marginBottom: "50px"
        }}>
          {/* First Row - 4 laptops */}
          <div style={{
            display: "flex",
            gap: "25px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            {laptops.slice(0, 4).map((laptop) => (
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

                  {/* Action Buttons */}
                  <div style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "auto"
                  }}>
                    <button 
                      onClick={() => handleAddToCart(laptop)}
                      style={{                        flex: 1,
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
                      onMouseOver={(e) => {
                        if (user) {
                          e.target.style.backgroundColor = "#219a52";
                          e.target.style.transform = "scale(1.02)";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (user) {
                          e.target.style.backgroundColor = "#27ae60";
                          e.target.style.transform = "scale(1)";
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

          {/* Second Row - 4 laptops */}
          <div style={{
            display: "flex",
            gap: "25px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            {laptops.slice(4, 8).map((laptop) => (
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

                  {/* Action Buttons */}
                  <div style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "auto"
                  }}>
                    <button 
                      onClick={() => handleAddToCart(laptop)}
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
                      onMouseOver={(e) => {
                        if (user) {
                          e.target.style.backgroundColor = "#219a52";
                          e.target.style.transform = "scale(1.02)";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (user) {
                          e.target.style.backgroundColor = "#27ae60";
                          e.target.style.transform = "scale(1)";
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