import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Plus, Minus, Star } from "lucide-react";

function PrintersPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // دالة الرجوع للصفحة الرئيسية
  const handleBack = () => navigate("/");

  // دالة لإضافة منتج إلى السلة
  const addToCart = (printer) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === printer.id);
      if (existingItem) {
        return prevCart.map((item) =>
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
    setCart((prevCart) => prevCart.filter((item) => item.id !== printerId));
  };

  // دالة لتعديل الكمية
  const updateQuantity = (printerId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(printerId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
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
      description:
        "Imprimante laser monochrome compacte, Wi-Fi, idéale pour le bureau",
      features: ["Laser monochrome", "Wi-Fi", "15 ppm", "Format A4"],
      type: "Laser",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Canon PIXMA TS3450",
      price: "18,000 DA",
      image: "/printer.png",
      description:
        "Imprimante multifonction jet d'encre, Wi-Fi, impression couleur",
      features: ["Jet d'encre couleur", "Multifonction", "Wi-Fi", "Scanner"],
      type: "Jet d'encre",
      rating: 4.2,
    },
  ];

  // حساب إجمالي السلة
  const cartTotal = cart.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return total + price * item.quantity;
  }, 0);

  const cartItemsCount = cart.reduce((t, i) => t + i.quantity, 0);

  // عرض النجوم
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-5 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <button
          onClick={handleBack}
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

      {/* Panier */}
      {cart.length > 0 && (
        <div className="max-w-5xl mx-auto mt-8 bg-white/90 rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ShoppingCart size={22} /> Panier ({cartItemsCount})
          </h3>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  {item.price} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-6 font-bold text-lg">
            <span>Total :</span>
            <span>{cartTotal.toLocaleString()} DA</span>
          </div>
        </div>
      )}

      {/* Liste des imprimantes */}
      <section className="mt-10 px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {printers.map((printer) => {
            const cartItem = cart.find((item) => item.id === printer.id);
            return (
              <div
                key={printer.id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={printer.image}
                  alt={printer.name}
                  className="h-32 object-contain mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {printer.name}
                </h3>
                <div className="flex items-center gap-1 mt-2 mb-3">
                  {renderStars(printer.rating)}
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {printer.description}
                </p>
                <p className="font-bold text-purple-700 text-lg mb-3">
                  {printer.price}
                </p>
                {cartItem ? (
                  <div className="flex justify-center items-center gap-3 bg-gray-100 rounded-full py-1">
                    <button
                      onClick={() =>
                        updateQuantity(printer.id, cartItem.quantity - 1)
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-semibold">{cartItem.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(printer.id, cartItem.quantity + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(printer)}
                    className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                  >
                    Ajouter au panier
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-10 mt-16">
        © 2025 CompDZ — Tous droits réservés.
      </footer>
    </div>
  );
}

export default PrintersPage;
