import React from "react";
import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";

function HomePage() {
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
          Our categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Card 1 */}
          <Link to="/PCStore">
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105">
            <img
              src="/laptop.png"
              alt="PCs Portables"
              className="w-30 h-30 md:w-24 md:h-24 object-contain mb-2"
            />
            <p className="text-sm md:text-base font-medium text-gray-700">
              Laptop
            </p>
          </div>
          </Link>
          {/* Card 2 */}
          <Link to="/composants">
            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105 cursor-pointer">
              <img
                src="/components.png"
                alt="Composants Pc"
                className="w-28 h-28 md:w-24 md:h-24 object-contain mb-2"
              />
              <p className="text-sm md:text-base font-medium text-gray-700">
                Components
              </p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link to="/peripheriques">
            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105 cursor-pointer">
              <img
                src="/accessory.png"
                alt="Périphériques & accessoires"
                className="w-30 h-30 md:w-26 md:h-26 object-contain mb-2"
              />
              <p className="text-sm md:text-base font-medium text-gray-700 text-center">
                Périphériques & accessoires
              </p>
            </div>
          </Link>

          {/* Card 4 - Printer with Link */}
          <Link to="/printers">
            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105 cursor-pointer">
              <img
                src="/printer.png"
                alt="Les imprimantes"
                className="w-28 h-28 md:w-26 md:h-26 object-contain mb-2"
              />
              <p className="text-sm md:text-base font-medium text-gray-700">
                Printer
              </p>
            </div>
          </Link>

          {/* Card 5 */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105">
            <img
              src="/monitor.png"
              alt="Computer monitors"
              className="w-28 h-28 md:w-24 md:h-24 object-contain mb-2"
            />
            <p className="text-sm md:text-base font-medium text-gray-700 text-center">
              Computer Monitors
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105">
            <img
              src="/cases.png"
              alt="Computer Cases"
              className="w-28 h-28 md:w-24 md:h-24 object-contain mb-2"
            />
            <p className="text-sm md:text-base font-medium text-gray-700 text-center">
              Computer Cases
            </p>
          </div>

          {/* Card 7 */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105">
            <img
              src="/cables.png"
              alt="Cables & adapters"
              className="w-28 h-28 md:w-24 md:h-24 object-contain mb-2"
            />
            <p className="text-sm md:text-base font-medium text-gray-700 text-center">
              Cables & Adapters
            </p>
          </div>

          {/* Card 8 */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center transition transform hover:scale-105">
            <img
              src="/gaming.png"
              alt="Gaming Zone"
              className="w-30 h-30 md:w-28 md:h-28 object-contain mb-2"
            />
            <p className="text-sm md:text-base font-medium text-gray-700 text-center">
              Gaming Zone
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

export default HomePage;
