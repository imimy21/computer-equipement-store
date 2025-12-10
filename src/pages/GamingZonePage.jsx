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
      image:"https://www.comx-computers.co.za/i/redragon/rd-k530rgb-pro_1.jpg",
      description: "Professional mechanical gaming keyboard with RGB lighting",
      features: ["Mechanical Switches", "RGB Lighting", "Programmable Keys", "Wrist Rest"],
      specs: "Razer Green Mechanical / RGB Chroma / USB / 104 Keys ",
      rating: 4.7
    },
    {
      id: 2,
      name: "Logitech G502 Hero",
      type: "Gaming Mouse",
      price: 8500,
      image: "data:image/jpeg;base64,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",
      description: "High-precision gaming mouse with customizable weights",
      features: ["High DPI", "Customizable Weights", "11 Programmable Buttons", "RGB"],
      specs: "HERO 25K / 25600 DPI / 11 Programmable / Adjustable",
     
      rating: 4.6
    },
    {
      id: 3,
      name: "SteelSeries Arctis Pro",
      type: "Gaming Headset",
      price: 16800,
      image: "https://images.ctfassets.net/hmm5mo4qf4mf/6b2ROu1hcq89CWp49Xasxv/b2ab8ee780f3d092dbfc28eff3cc4cc9/buyimg__arctisprogamedac_black_001.jpg__1920x1080_q100_crop-fit_optimize_subsampling-2-2321.jpg",
      description: "Premium gaming headset with high-resolution audio",
      features: ["Hi-Res Audio", "DTS Headphone", "ClearCast Mic", "RGB Illumination"],
      specs: " 40mm Neodymium / 10-40000 Hz / 3.5mm + USB / Retractable ",
      rating: 4.8
    },
   {
  id: 4,
  name: "Xbox Series X Controller",
  type: "Game Controller",
  price: 7500,
  image: "data:image/jpeg;base64,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",
  description: "Wireless controller for Xbox Series X|S and Windows",
  features: ["Wireless", "Textured Grip", "Share Button", "Bluetooth"],
  specs:"Bluetooth & Wireless  /AA x2 / Xbox & Windows / Customizable",
  
  rating: 4.5
},
    {
      id: 5,
      name: "PlayStation DualSense",
      type: "Game Controller",
      price: 8900,
image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhASEBAQFRIRFRAVFhUSEBASFRoVGBYXGhUVGBgYHSgiGBolGxUVITEhJyorLy4uFx8zODMsOCguLysBCgoKDQ0OGA8PFS0dFR4tNy4tLSsrLS0tLSsrNSs3Ky03LS03LS0rLS03Nzc3Ky0tKys3Ky0tLS0rNystNysrK//AABEIAKMBNgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQj/xABCEAABAwIDBAcECAQFBQEAAAABAAIDBBEFEiEGMUFRBxMiYXGBkTJCobEUI1KCksHR8DNicuEVU6KywyRDVISTF//EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAJhEBAQEAAQIFAwUAAAAAAAAAAAERAgMxEiFBwfBRYdEEIjJxof/aAAwDAQACEQMRAD8A7iiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgLBxTGKalAdU1EMQO7rJGsv3AE6nwUJt/U4iIGMwtrTPJIGvcTGOriyuu4ZyADmyDibE2F93Mv8A8tr53ukqa2JrnWu762pkP9TnZdfvFWRHRZek/B2kj6U424tpqtw9RHY+SmcB2noq6/0WcSFoBLcsjHAXtfK8A2v3LmtP0SUgt11VVScwDFG0+Ra4j1Wz4FsxSUF3UolY8sdHn6x73ZXOa46Ou292g3tz5lXwmt7RcL6QpsRpjGwYpVkOLzmEnUktd7Id1eUXGUjS1960KWepk/iV1U7d7U87t5txeVrn0rwzfWaTlr6ve8DeQPEgKw/EYG+1NEPGRg/NfJhwyM3JzE2JJtrobG5LfNVOwqEXu1+mfeAPZ+7p+Sxivqs43SDfVU3/AN4v1Xgx2j/8um/+8X6r5XOFwD3Hb3fZ4NugwyA+4eHLi2/P9/BMH1YzFaZ26ogPhLGfzWRHOx3svafBwK+ShhUJtZrtcm4NPtX7u5Uf4VEbWDtQD7I4mw3NTB9eIvkiFj4/4VTNHa57D5G7jbSxCntm8VxD6RE0YjWFpdYt+kzOBsDpYuIWun07z5TjO9S3Jr6QxCuip43yzyNjjYLue42A1AHxIHmtWk6UMHBI+lPNuIpawj1EevkrBwd0tM+lr6iaqbLlL85bGBlcHNa0xhrgAWjeSTbyWvV3RZh8hux9VEf5JWuH+tpPxTw4a33CtscOqiGwVkLnO3Mc7q3nwY+zvgp1cKruiSTXqK5rhwbPCfi5rj/tWzbBUmM0MsENQ5stK4yiQiYSNjAYTGWZ7PALgG2sQL7hvWcNdPReA33L1RRERAREQEREBERAREQEREBERAREQEREBUTSZWk/u/BVrCrX3Iby1PjwVgx9w71jyOVyZy5f0p4/VU8sUcMjmMyRuOVzm3c90oJcWkGwEbdL+8e5bZdGc5WJDdzQdxDvXQjzsHei5RsNtHVurY4XTmWN5c03fK9pGR7sw6wktILRutxXVZWBws4AjkRdJ5jRek+AvpoZbkmJ7mE89bA38nHzXK3S7xr7w3nxHHmu57aUQkoZ2NA7IDgALAW0PwJXAXu1Xp637ujw5fTZ7+7PHvWY6Qa/e4DiLjef34r3rBru1zf5dtWfr+7rBD16JP3fusvG2zesHdbX/LB9jw5/u+q960cxw/y/seHP931WF1p5n1PKydaeZ9TysgzBKNN3u8I+DNfj/e5VIkGm7TLwbwFzx13rE63v+PdZeGRBliXd5c/Hn++5bT0cUvXVsN9zLvPiO1+RWl5103oapbvqJfstDfMnQ+gcvX+kmXly+kv4n+s8+2OlTP3H3nPsD3Am4/C06cyqcRxOGmidLPIGMbbU8zuAA1JPJXRC3MXZW5jxsL+vktG6XaUvhpXuzdTFK7rSATbM0BrtN3vNvwzd64VU7hO3NDUyNiY+Rj3+wJYzGH33ZTuN7G17XW0wvXznTMNRJFHE/NOZWdUGse2wuLtF9zWhocOWU819CNfqpLom6CTe3lqPDj8fmsxQ8EtrO5fLiphYqwREUUREQEREBERAREQEREBERAREQEREHhKii+93czf9FnV77MP82nrv+F1HOOi1xSuZ7U9I81PUyxRRRlkZcLuY6QnKS17jZ7cozAjjuvfWy13EsUbjgyC0dZGD1bL2ZMwdosFycsg7RAvY3PlmbYbGV76qZ9MwOjm6y5EjG3D3l5a4OPBx+AUTFhhwfLUVQDqo36iEOuxpH/dlc3QgcGg6kdxsDCYv8Hy1FS3/AKpwPU09/ZaQ5pmltuFi8NbvNzutcSkPSjPmaXQxmPW4Eb2uIAu7K4yEXA7jw53UcZxjWjsrK1jTlF8scrBc2/kkaL67nDw0s0ewuJZmRvjDY7uJJkjLQXNyudZrrk2A9E/odjqmCSORvB7HjyLT+q+ccWhMcsrDva9wt4Fd82hxeKjp3ySOsLZGjiSRoBzNgV8+1tQ6R8kjt73PebcC4kny1XpvLOj4b61ifyWkuqbpdeVtVdLr2MAkAkC5Aub2HebXNvBZOIUrIiAyeKW4veITWHcesYw38AgxboqbpdBUF2vo0Yynw98zzoS97iNTla2489Tp3riQPJdT6M8SjqKaow+R+V7mPycy0ggubzLezp/L3r09HlnDnPWz58+zPLvFuTpGrHSN6ttIxr8mWJ/XOdZ1i0OeBbMQRu0F1v2zuMx19NHOGWEgcHMdZ1nA2e0/aHzBC5TLsfXxzMH0OSQxmIB8dRCInZA0B3abdoOUXB13rpmx2DGhpIoHODnjM55bfLncbkNvwGgvxtfS9lwmrWfQ4TTU5cYKeCIu3mKKNhPcS0blqm1220lPM+GnbGOqydZLKHOGZwuGMa3ebbye/dvO7Fc1232WqHzySwxOlimLHkRuYJI5A3Key4jO09xv4W1tG1dH+18lYXRVDYxIGl7HxBwZIwOyu7LtWuabXHG99F0ehfdoHFun6fBco6PMAlgc2WVjoskb2Mjc5jnkvc0vkfl0HsgAd5vzPTMNl7RH2h8R/a6zeypNERZUREQEREBERAREQEREBERAREQEREEdiT+01vIE+ug+RWFIVeqn3kf3G3p/e6xpCtxGPIVy7pcp5C+JwY4x5YxcA72ulzC9jY2e39hdOkKsPKtRxzo9pHGvjfHHIGRl5OfUgGN7bucAB71t3FddqqpkTXPkcGsYC5zibAAbyUc4AaLRNp8QbVGpjIJp6RmeQ3ID3guFu8NMbvvA/ZSeQ1LajaBtfN1spd1EeYQwjQ24veeDnW8hYc7xQxWMbqJmXnmN/G+VYkDbjMR3NHDRZGvP4aKaPBNTlwkYzQavhk1uOJa79+S2vqaDq2SCCHI8XBLBfvB71pVZF740I3rJBd9FkDT2WSROI+y2QGxHMZmlp77c0EtUVNM17gIKLLma4fVyE9SB9aTbTPe1la+m0+4wUVwHg/VTWzO/gcN32vyWtZzzPqsiphLNz7jUX1HwRW6UMVFIGNNPTdYQ3NlZ2c1tbX1tdQ+OCldIWRMZGyM2e9rRcu+y0fmrGx0L3z9ng3jzcbN9O07wYVjYjCzr5WMuGRveDqSbg2dr3kFEXBicLezHSZwOL3XPyK9ixCIPZJC11NPG4OY5pu3MNwI+G6xvbW6ttB4aDgAqZYg8Wd5FB27ZHaSPEIM4s2Vlmyx/ZfzHNp3g+I3gqH6UcYkp4IWRue3r3uzuY7K7IwAlodbS+b4eK5vsVXz09XC6I6vLo5Gk2D2hpdlJ4ONrNP2gOZXX8ToqfEqeO7nZXZZIpGdl7HcHC+4jUEHvCo5Nh9dLQSxyslkuXguFyGlnvskaffsdR7uhvqLdvc5aTgvR/FBIJJZ3zBrg9rMgjZmHsueMzs5GvIdy3AuSQrMp3KTppbFp5EenH4KGgcpKI6INnRWqV+ZjTzA9eKurm0IiICIiAiIgIiICIiAiIgIiICIrVU6zHnk13yQQgde55kn1VqVyqB0VmVy6MrMhWO8q68rFlksg1vbzaD6HTktP1st2RjiD7z/IH1IXPcIxYPpp4Se3KwRC51JEcrh5Zrj7yjttMcNbUveD9UzsR8soPteZufMclBBQZ9I+7RzBKv3Uecw7W4neeB/uqvpj+XwUGRWOs23ErH+kFgcwHR0YY78Yk+Dreip1drv7+CsOCqrkUgF7tB9Pz0VySoB90G/MD571ZiLQe0Lj0VyYstYMIOm8qCU2axIQOeTYWbI8G+8iNzQ0d5zu9VZqSG1FQL3D3yOB4EFxc0jxDgowKvKSL8vh/ZVEndL21KwGVbxwv4ar0yF+mp7goq5FUGNzZG+0JWyD7huPi74LdejHaUtlfSynsTOc+Lk2QklzO4O3jvH8y0CUG6pjeWkOaSHNIII3gg3BHeCqj6PLlQXKG2ZxkVlNHNpmIyvA4SN0cPDiO4hSeZaGZA5SUDlDwuUlTuQbLhL7x25Fw/P81mqLwN2jx3g+o/spRc73agiIoCIiAiIgIiICIiAiIgIiICxsRNo3+H5rJWLif8J/l8wkEI4rGkcrrysaRy6MrUrlpPSPjXUUpY02kqLxi28Nt9Y7008XBbbUPXFdv8S+k1j2tN2QfVN5ZgbyH8Wn3EGtMjLjZoJJ4AXUxh2zVTMbBjri12ta6R/m1gJHotw2G2T6+SGM3b1lnPI0dktdxJ93TcOZF+S7/Q0UUDGxQsayNgsGtFgP796zfJXzmcDlo4XSS0lU5jdXF1LOxoHMue0ABQpxCjJuaRv4GfqvqXE6GOphmglF45mPjcBocrgQbcjYrlDugxmbs4i/JyNM0u/EHgfBNMaLBhprYyYKSpDAcocymlkYSN4BjBGmij37CV3uwVB8aSrH/GvpXZfAYsPpoqWEuLY83adbM5znFznG3MuPhoFKqaY+UzsFif8A4lQf/WqR84143YXFDvo6keNPUH5MK+rUTTHyoNhMRHtU1QP/AFas/wDGpGg2RqYbudS1jyATlbRVWvcLsX00iaY+VJ8SpHHWlF+9rL/NSGEMbVZo6ajlOVt3GGF0lr6C4jBIvr6FdGxvoWinmllhrXxCV75Cx0DZQ0ucXENIc3S5Nr3W2bB7Ew4SyVrJHSyTFhe9zWt0aDlaANwGZx3n2irpj5+xbY+pju8xTMaNSZYJoR6vaB8Vr9TRSRWzsIvuO8HwI0K+ylzTpG2OhcRNE1rOtJEgA7BfvDi0bidbuFjcA63sUo5X0a4t1U7oHHsVA7PdI0XHq248mrp4euHYrTSUk9hdr4nNc2/BwILT3jcV2LDq5s8UUrdBIxrrcrjUeINx5LURKxOUlTuUPC5SVO5UbLgLu0/wb8z+qmVBbPe0/wDpHzU6ud7rBERRRERAREQEREBERAREQEREBWK5t45P6XfJX14RfTmg1R5WJK5ZEwyktO9pI9NFH1D10ZRG0WJCngmmP/bY4gc3bmjzcQPNcl2Sww1Eplk7TIzmcT70h1APxcfLmtp6VcQIjhgbcmV+Ygby1m4ebnN/CsvA8N6iGKFou/TNbjI7f8dB3AIOi9G2H2bLUOGrj1bfAauPmcv4Vu6w8HohTwxRD3GgHvdvcfMkrLusVp6iIoCIiAiIgIiICIvLoPVh4xR9fDJHxcOz/UNW/EBZRcvM6DgnSBgX0iDrmN+ugBJFtXRjVzfEakeY4rA6OMQzQyQk6xOzN/ofc/7g4/eC6dtBS9VO+3sydsfe9ofiv8FyCKn/AMPxTqxpFNdreWSTVg8pGhvgF0+7Lo8D1KUzlB071L0r1RtuzQ/iH+gfP9QptRmzsdoQftkny3D5KTXO92oIiKAiIgIiICIiAiIgIiICIiAiIg1jaOHI/P7sn+4b/hY+q12plW+4nSCVhY7ceI3g8CFzzF8OqoifqnvbwdGC7/SNQtypXN8T/wCqxax1ZStb4XaMw888g/Cuk7E4f1kwlcOxDqO9/ujy3+i1bZzZKoM08j2uZ1zsznPABHaccrW7za41Nl1DDaMRMaxos0fsk8ypaYnROrjXrBiCyWLKsgFVK21VhBUi8C9QEREBERB4qSVUqSEFp7ljvlV97VizRFBEbQw9ay49qO5HePeHyPkuQdJ1GTFFUM0fA8C/c4ix8nBvqV2eeB3BaZtZs9JLFM1jLh7TdosNd92303rUvolQ+H1YkZHIN0jWPHg4A/mp/DWukcxjfacQB+v5rV8FwarYyOJtPMcgygluUWBOXtHTdbiunbKYIYBnksZCLabmjkOZ7/2bqY2SCMMa1o3NAA8AFcXgXqw0IiICIiAiIgIiICIiAiIgIiICIiArb4QVcRBhiiaOCuCnHJZCILIiCrDVWiCkBer1EBERAREQEREBeWXqIKS1UmNXEQWDAFQ6jaeCykQY8VI1vBXwLL1EBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB/9k=",
      description: "Wireless controller for PS5 with haptic feedback",
      features: ["Haptic Feedback", "Adaptive Triggers", "Built-in Mic", "Touch Pad"],
      specs: "Bluetooth & USB / Built-in Rechargeable / Haptic Feedback/ PS5 & PC",
     
      rating: 4.7
    },
    {
      id: 6,
      name: "Corsair MM300",
      type: "Gaming Mousepad",
      price: 3200,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxsmdcNKCCBi8u9OVSycSDHMMmvZaHAwt9uw&s",
      description: "Extended gaming mousepad with optimized surface",
      features: ["Extended Size", "Anti-Fray Cloth", "Optimized Surface", "Non-Slip Base"],
      specs: "930x300x3mm / High-quality cloth / Rubber non-slip / Stitched edges",
      
      rating: 4.4
    },

  ];

  // Simulate user state
 useEffect(() => {
  const savedUser = localStorage.getItem('userData') || localStorage.getItem('user');
  if (savedUser) {
    setUser(JSON.parse(savedUser));
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
         // الانتقال المباشر لصفحة الدفع
         navigate("/payment", { state: { product } });
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
          Gaming Zone
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
                boxShadow: "0 8px 30px rgba(223, 5, 5, 0.08)",
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
                    objectFit: "contain",
                    borderRadius: "12px"
                  }}
                 onError={(e) => {
  e.target.src = `https://via.placeholder.com/250x160/f8f9fa/666666?text=${encodeURIComponent(product.name)}`;
  e.target.onerror = null; // Évite la boucle infinie
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
  <div style={{
    fontSize: "0.75rem",
    color: "#2c3e50",
    fontWeight: "600",
    lineHeight: "1.4",
    padding: "8px 0"
  }}>
    {product.specs}
  </div>
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
          Your ultimate destination for premium gaming equipment
          {user ? ` - Logged in as: ${user.email}` : " - Login to make purchases"}
        </p>
      </footer>
    </div>
  );
};

export default GamingZonePage;
