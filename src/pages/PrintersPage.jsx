import React, { useState } from "react";
import { ArrowLeft, ShoppingCart, Plus, Minus, Star } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 👈 استيراد useNavigate

function PrintersPage() {
  const navigate = useNavigate(); // 👈 إنشاء الموجه
  const [cart, setCart] = useState([]);

  // دالة لإضافة منتج إلى السلة
  const addToCart = (printer) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === printer.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === printer.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...printer, quantity: 1 }];
      }
    });
  };

  // دالة لإزالة منتج من السلة
  const removeFromCart = (printerId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== printerId));
  };

  // دالة لتعديل الكمية
  const updateQuantity = (printerId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(printerId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === printerId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // بيانات الطابعات
  const printers = [
    {
      id: 1,
      name: "HP LaserJet Pro M15w",
      price: "25,000 DA",
      image: "/printer.png",
      description: "Imprimante laser monochrome compacte, Wi-Fi, idéale pour le bureau",
      features: ["Laser monochrome", "Wi-Fi", "15 ppm", "Format A4"],
      brand: "HP",
      type: "Laser",
      rating: 4.5
    },
    {
      id: 2,
      name: "Canon PIXMA TS3450",
      price: "18,000 DA",
      image: "/printer.png",
      description: "Imprimante multifonction jet d'encre, Wi-Fi, impression couleur",
      features: ["Jet d'encre couleur", "Multifonction", "Wi-Fi", "Scanner"],
      brand: "Canon",
      type: "Jet d'encre",
      rating: 4.2
    },
    {
      id: 3,
      name: "Epson EcoTank L3210",
      price: "35,000 DA",
      image: "/printer.png",
      description: "Système de réservoirs d'encre intégrés, économique à long terme",
      features: ["Réservoirs d'encre", "Économique", "Multifonction", "Wi-Fi"],
      brand: "Epson",
      type: "Jet d'encre",
      rating: 4.7
    },
    {
      id: 4,
      name: "Brother HL-L2350DW",
      price: "28,000 DA",
      image: "/printer.png",
      description: "Imprimante laser réseau Wi-Fi, impression recto verso automatique",
      features: ["Laser monochrome", "Wi-Fi", "Recto verso", "30 ppm"],
      brand: "Brother",
      type: "Laser",
      rating: 4.4
    },
    {
      id: 5,
      name: "Samsung Xpress M2070W",
      price: "22,000 DA",
      image: "/printer.png",
      description: "Imprimante laser multifonction compacte avec Wi-Fi",
      features: ["Laser multifonction", "Wi-Fi", "Compacte", "20 ppm"],
      brand: "Samsung",
      type: "Laser",
      rating: 4.1
    },
    {
      id: 6,
      name: "Lexmark MC3224dwe",
      price: "32,000 DA",
      image: "/printer.png",
      description: "Imprimante laser couleur multifonction pour petits bureaux",
      features: ["Laser couleur", "Multifonction", "Wi-Fi", "24 ppm"],
      brand: "Lexmark",
      type: "Laser",
      rating: 4.3
    },
    {
      id: 7,
      name: "HP OfficeJet Pro 9015e",
      price: "27,500 DA",
      image: "/printer.png",
      description: "Imprimante intelligente rechargeable par abonnement HP+",
      features: ["Jet d'encre", "Rechargeable", "Wi-Fi", "Mobile printing"],
      brand: "HP",
      type: "Jet d'encre",
      rating: 4.6
    },
    {
      id: 8,
      name: "Canon imageCLASS MF644Cdw",
      price: "38,000 DA",
      image: "/printer.png",
      description: "Imprimante laser couleur avec impression recto verso automatique",
      features: ["Laser couleur", "Recto verso", "Wi-Fi", "22 ppm"],
      brand: "Canon",
      type: "Laser",
      rating: 4.5
    },
    {
      id: 9,
      name: "Epson WorkForce WF-2860",
      price: "19,500 DA",
      image: "/printer.png",
      description: "Multifonction compacte avec alimentation automatique des documents",
      features: ["Jet d'encre", "ADF", "Wi-Fi", "Compacte"],
      brand: "Epson",
      type: "Jet d'encre",
      rating: 4.0
    },
    {
      id: 10,
      name: "Brother DCP-T420W",
      price: "33,000 DA",
      image: "/printer.png",
      description: "Imprimante multifonction avec réservoirs d'encre haute capacité",
      features: ["Réservoirs d'encre", "Multifonction", "Wi-Fi", "Économique"],
      brand: "Brother",
      type: "Jet d'encre",
      rating: 4.8
    }
    // يمكن إضافة بقية الطابعات هنا بنفس النمط
  ];

  // حساب إجمالي السلة
  const cartTotal = cart.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // دالة لعرض النجوم
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-5 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <button 
          onClick={() => navigate("/")} // 👈 زر الرجوع للصفحة الرئيسية
          className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={26} />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Les Imprimantes
        </h1>
        <div className="relative">
          <button className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100 relative">
            <ShoppingCart size={26} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-semibold shadow-lg">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* محتوى الصفحة */}
      <section className="mt-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Tous Types d'Imprimantes 
            <span className="block text-lg font-normal text-gray-600 mt-2">
              ({printers.length} modèles disponibles)
            </span>
          </h2>

          {/* سلة التسوق */}
          {cart.length > 0 && (
            <div className="mb-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <ShoppingCart size={24} />
                Panier ({cartItemsCount} produit{cartItemsCount > 1 ? 's' : ''})
              </h3>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-200/50 last:border-b-0">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg">{item.name}</p>
                      <p className="text-gray-600 text-sm">{item.price} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-200"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold text-gray-800 min-w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-200"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors font-medium text-sm px-3 py-1 rounded-lg hover:bg-red-50"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-6 border-t border-gray-300">
                  <span className="font-bold text-xl text-gray-800">Total</span>
                  <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {cartTotal.toLocaleString()} DA
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 mt-6 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Finaliser Votre Achat
                </button>
              </div>
            </div>
          )}

          {/* قائمة الطابعات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {printers.map((printer) => {
              const cartItem = cart.find(item => item.id === printer.id);
              return (
                <div 
                  key={printer.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-200/50 group"
                >
                  {/* صورة الطابعة */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={printer.image}
                      alt={printer.name}
                      className="h-32 object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {printer.type}
                      </span>
                    </div>
                  </div>

                  {/* معلومات الطابعة */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800 leading-tight flex-1">
                        {printer.name}
                      </h3>
                      <div className="flex items-center gap-1 ml-2">
                        {renderStars(printer.rating || 4.0)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {printer.description}
                    </p>
                    
                    {/* الميزات */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {printer.features.slice(0, 3).map((feature, index) => (
                          <span 
                            key={index}
                            className="bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full border border-purple-100"
                          >
                            {feature}
                          </span>
                        ))}
                        {printer.features.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                            +{printer.features.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {printer.price}
                      </span>
                      {cartItem ? (
                        <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full px-4 py-2 border border-green-200">
                          <button 
                            onClick={() => updateQuantity(printer.id, cartItem.quantity - 1)}
                            className="text-green-600 hover:text-green-800 transition-colors p-1 rounded-full hover:bg-green-200"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-green-800 min-w-6 text-center">{cartItem.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(printer.id, cartItem.quantity + 1)}
                            className="text-green-600 hover:text-green-800 transition-colors p-1 rounded-full hover:bg-green-200"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart(printer)}
                          className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          Ajouter au Panier
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-12 mt-16 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 font-medium"> © 2025 CompDZ — All Rights Reserved.</p>
          <p className="text-gray-500 text-xs mt-2">Votre partenaire de confiance pour toutes vos impressions</p>
        </div>
      </footer>
    </div>
  );
}

export default PrintersPage;
