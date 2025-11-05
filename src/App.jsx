import React from "react";
import { Menu, User } from "lucide-react";

function App() {
  return (
    <div className="bg-[#f8f5f9] min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-[#e9e0eb] rounded-b-3xl shadow-sm">
        <button className="text-gray-700">
          <Menu size={28} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          CompDZ
        </h1>
        <button className="text-gray-700">
          <User size={28} />
        </button>
      </header>

      {/* Hero video section */}
      <section className="mt-4">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden mx-auto max-w-7xl shadow-md">
          <video
            src="/tech.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          ></video>
          <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white text-center text-sm md:text-base py-2">
            ComDZ Where quality meets technology
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-10 px-6 text-center">
        <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-900">
          Achetez Par Catégorie
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105">
            <img
              src="/laptop.png"
              alt="PCs Portables"
              className="w-20 h-20 md:w-24 md:h-24 object-contain mb-2"
            />
            <p className="text-sm md:text-base font-medium text-gray-700">
              PCs Portables
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105">
            <img
              src="/components.png"
              alt="Composants Pc"
              className="w-20 h-20 md:w-24 md:h-24 object-contain mb-2"
            />
            <p className="text-sm md:text-base font-medium text-gray-700">
              Composants Pc
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105">
            <img
              src="/accessory.png"
              alt="Périphériques & accessoires"
              className="w-20 h-20 md:w-24 md:h-24 object-contain mb-2"
            />
            <p className="text-sm md:text-base font-medium text-gray-700 text-center">
              Périphériques & accessoires
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105">
            <img
              src="/printer.png"
              alt="Les imprimantes"
              className="w-20 h-20 md:w-24 md:h-24 object-contain mb-2"
            />
            <p className="text-sm md:text-base font-medium text-gray-700">
              Les imprimantes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 mt-10">
        © 2025 CompDZ — Tous droits réservés.
      </footer>
    </div>
  );
}

export default App;
