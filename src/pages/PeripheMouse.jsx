import React, { useState } from "react";

const sourisProducts = [
  { id: 1, name: "Logitech M185", image: "/mouse1.png", price: 2500, description: "Compact and reliable wireless mouse, perfect for everyday use." },
  { id: 2, name: "Razer DeathAdder", image: "/mouse2.png", price: 13500, description: "Ergonomic gaming mouse with high-precision sensor." },
  { id: 3, name: "Corsair Harpoon", image: "/mouse3.png", price: 9000, description: "Lightweight gaming mouse with programmable buttons." },
  { id: 4, name: "Microsoft Bluetooth", image: "/mouse4.png", price: 3200, description: "Stylish and economical Bluetooth mouse." },
  { id: 5, name: "Logitech MX Master", image: "/mouse5.png", price: 22000, description: "High-end mouse for productivity and creation." },
];

function PeripheMouse() {
  const [panier, setPanier] = useState([]);
  const [showPanier, setShowPanier] = useState(false);

  const addToPanier = (product) => {
    setPanier((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setPanier((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(1, p.quantity + delta) }
          : p
      )
    );
  };

  const removeFromPanier = (id) => {
    setPanier((prev) => prev.filter((p) => p.id !== id));
  };

  const total = panier.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <div className="bg-[#f8f5f9] min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#e9e0eb] shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center w-full">
          🖱️ Mouse
        </h1>
        <button
          onClick={() => setShowPanier(true)}
          className="relative bg-[#e9e0eb] px-4 py-2 rounded-xl font-semibold flex items-center gap-2"
        >
          🛒
          <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
            {panier.reduce((acc, p) => acc + p.quantity, 0)}
          </span>
        </button>
      </header>

      {/* Description */}
      <p className="text-center text-gray-700 mt-4 mb-6 text-lg">
        Discover our collection of comfortable and high-performance mice.
      </p>

      {/* Products */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 items-stretch">
        {sourisProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md flex flex-col items-center p-4 hover:shadow-xl transition h-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-h-40 object-contain"
            />
            <h3 className="font-semibold text-gray-800 text-lg mt-3 text-center">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm text-center mt-1 flex-1">
              {product.description}
            </p>
            <p className="text-gray-900 font-bold mt-2">{product.price} DA</p>
            <div className="flex gap-2 mt-3 w-full">
              <button
                onClick={() => addToPanier(product)}
                className="flex-1 bg-blue-600 text-black py-2 rounded-md hover:bg-blue-700 transition text-sm font-semibold"
              >
                Add to card
              </button>
              <button
                onClick={() => {}}
                className="flex-1 bg-green-500 text-black py-2 rounded-md hover:bg-green-600 transition text-sm font-semibold"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Panier Side Panel */}
      {showPanier && (
        <div className="fixed inset-y-0 right-0 z-50 flex">
          <div className="bg-white w-full sm:w-[400px] h-full p-6 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">🛍️ Shopping Cart</h2>
              <button
                onClick={() => setShowPanier(false)}
                className="text-gray-500 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            {panier.length === 0 ? (
              <p className="text-gray-500">Votre panier est vide.</p>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto space-y-4">
                  {panier.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div className="flex-1 ml-3">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{item.price} DA</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full font-bold"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromPanier(item.id)}
                        className="text-red-500 font-bold ml-2"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t pt-4">
                  <p className="text-right font-semibold text-gray-800">
                    Total: {total} DA
                  </p>
                  <button
                    onClick={() => {}}
                    className="w-full mt-3 bg-green-500 text-black py-2 rounded-lg hover:bg-green-600 transition font-semibold"
                  >
                    Login to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="text-center text-gray-500 text-sm py-6 mt-10">
        © 2025 CompDZ — All Rights Reserved
      </footer>
    </div>
  );
}

export default PeripheMouse;
