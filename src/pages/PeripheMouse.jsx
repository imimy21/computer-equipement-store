import React, { useState } from "react";

const sourisProducts = [
  {
    id: 1,
    name: "Logitech M185",
    image: "/mouse1.png",
    price: 2500,
    description: "Souris sans fil compacte et fiable, parfaite pour le quotidien."
  },
  {
    id: 2,
    name: "Razer DeathAdder",
    image: "/mouse2.png",
    price: 13500,
    description: "Souris gaming ergonomique avec capteur haute précision."
  },
  {
    id: 3,
    name: "Corsair Harpoon",
    image: "/mouse3.png",
    price: 9000,
    description: "Souris gaming légère avec boutons programmables."
  },
  {
    id: 4,
    name: "Microsoft Bluetooth",
    image: "/mouse4.png",
    price: 3200,
    description: "Souris Bluetooth élégante et économique."
  },
  {
    id: 5,
    name: "Logitech MX Master",
    image: "/mouse5.png",
    price: 22000,
    description: "Souris haut de gamme pour productivité et création."
  },
];

function PeripheMouse() {
  const [panier, setPanier] = useState([]);
  const [showPanier, setShowPanier] = useState(false);
  const [quantities, setQuantities] = useState({});

  const addToPanier = (product) => {
    const quantity = quantities[product.id] || 1;
    setPanier((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  const updateQuantityLocal = (productId, delta) => {
    setQuantities((prev) => {
      const newQty = (prev[productId] || 1) + delta;
      return { ...prev, [productId]: newQty > 0 ? newQty : 1 };
    });
  };

  const updateQuantityPanier = (productId, delta) => {
    setPanier((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newQuantity = p.quantity + delta;
          return { ...p, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return p;
      })
    );
    // مزامنة الكمية المحلية مع الباني (لو أردتِ)
    setQuantities((prev) => ({
      ...prev,
      [productId]: panier.find((p) => p.id === productId)?.quantity || 1,
    }));
  };

  const removeFromPanier = (productId) => {
    setPanier((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <div className="bg-[#f8f5f9] min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center px-6 py-6 bg-[#e9e0eb] rounded-b-3xl shadow-sm w-full">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center flex-1">
          🖱️ Souris
        </h1>
        <button
          onClick={() => setShowPanier(!showPanier)}
          className="bg-[#e9e0eb] px-4 py-2 rounded-xl transition font-semibold flex items-center gap-2 mt-3 sm:mt-0"
        >
          🛒 Panier ({panier.reduce((acc, p) => acc + p.quantity, 0)})
        </button>
      </header>

      {/* وصف خاص بالصفحة تحت الشريط العلوي */}
      <div className="mt-4 px-6 text-center">
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
          Découvrez notre sélection de souris : sans fil, gaming ou ergonomiques. Choisissez la souris adaptée à votre usage.
        </p>
      </div>

      {/* Panier Modal */}
      {showPanier && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 w-full">
          <div className="bg-white p-6 rounded-2xl max-w-3xl w-full mx-4">
            <h2 className="text-lg font-semibold mb-4">Votre Panier</h2>
            {panier.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
                {panier.map((item) => (
                  <li key={item.id} className="flex items-center justify-between w-full">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg" />
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>{item.price} DA</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantityPanier(item.id, -1)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantityPanier(item.id, 1)}
                        className="bg-gray-200 px-2 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromPanier(item.id)}
                        className="bg-red-400 text-white px-2 rounded ml-2"
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowPanier(false)}
              className="mt-4 bg-[#e9e0eb] px-4 py-2 rounded-xl hover:bg-[#d6c4de] transition w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Products */}
      <section className="mt-6 px-4 sm:px-6 flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
          {sourisProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center p-4 w-full"
            >
              <div className="w-full flex justify-center items-center p-2 min-h-[120px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-32 sm:max-h-40 md:max-h-44 w-auto object-contain"
                />
              </div>
              <div className="text-center mt-2 flex-1 flex flex-col justify-between min-h-[120px]">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                </div>
                <p className="text-gray-800 font-semibold mt-2">{product.price} DA</p>
              </div>

              <div className="flex flex-col gap-2 mt-3 items-center w-full">
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantityLocal(product.id, -1)} className="bg-gray-200 px-2 rounded">-</button>
                  <span>{quantities[product.id] || 1}</span>
                  <button onClick={() => updateQuantityLocal(product.id, 1)} className="bg-gray-200 px-2 rounded">+</button>
                </div>

                <button
                  onClick={() => addToPanier(product)}
                  className="px-4 py-2 rounded-xl transition w-full bg-white text-black border border-gray-400 hover:bg-gray-100"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 mt-10 w-full">
        © 2025 CompDZ — All Rights Reserved
      </footer>
    </div>
  );
}

export default PeripheMouse;
