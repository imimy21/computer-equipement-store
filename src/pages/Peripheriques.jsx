import React from "react";
import { useNavigate } from "react-router-dom";

function PeripheriquesCategories() {
  const navigate = useNavigate();

  const categories = [
    { name: "Clavier", image: "/images/clavier.jpg", path: "/peripheriques/clavier" },
    { name: "Souris", image: "/images/souris.jpg", path: "/peripheriques/souris" },
    { name: "Casque", image: "/images/casque.jpg", path: "/peripheriques/casque" },
    { name: "Webcam", image: "/images/webcam.jpg", path: "/peripheriques/webcam" },
    { name: "Tapis de souris", image: "/images/tapis.jpg", path: "/peripheriques/tapis" },
    { name: "Clé USB", image: "/images/usb.jpg", path: "/peripheriques/usb" },
    { name: "Microphone", image: "/images/micro.jpg", path: "/peripheriques/micro" },
  ];

  return (
    <div className="bg-[#f8f5f9] min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-center items-center px-6 py-6 bg-[#e9e0eb] rounded-b-3xl shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">
          🎧 Catégories Périphériques
        </h1>
      </header>

      {/* Description */}
      <section className="px-6 mt-6 max-w-5xl mx-auto text-center text-gray-600 leading-relaxed">
        <p>
          Découvrez notre large sélection de périphériques informatiques :
          claviers, souris, casques, webcams, tapis et plus encore. Choisissez
          une catégorie pour explorer nos produits.
        </p>
      </section>

      {/* Categories */}
      <section className="mt-10 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(cat.path)}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition transform duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-contain p-4"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 mt-10">
        © 2025 CompDZ — Tous droits réservés.
      </footer>
    </div>
  );
}

export default PeripheriquesCategories;
