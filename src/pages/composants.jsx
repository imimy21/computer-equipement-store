 import React from "react";

const parts = [
  { title: "Processor", image: "/CPU.png" },
  { title: "Motherboard", image: "/motherboard.png" },
  { title: "RAM", image: "/Ram.png" },
  { title: "Graphics Card", image: "/gpu.png" },
  { title: "SSD", image: "/SSD.png" },
  { title: "Hard Drive", image: "/Hard-drive.png" },
];

export default function Composants() {
  return (
    <div className="bg-[#f8f5f9] min-h-screen font-sans flex flex-col">
      {/* Header with emoji and frame */}
      <header className="flex justify-center items-center px-6 py-6 bg-[#e9e0eb] rounded-b-3xl shadow-sm">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
           PC Components
        </h1>
      </header>

      {/* Description */}
      <section className="px-4 sm:px-6 mt-6 max-w-5xl mx-auto text-center text-gray-600 leading-relaxed">
        <p className="text-sm sm:text-base">
          Browse through our selection of essential PC components including processors, motherboards, RAM, graphics cards, SSDs, and hard drives. Click on a component to explore more details.
        </p>
      </section>

      {/* Components Grid */}
      <section className="mt-8 px-4 sm:px-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {parts.map((part, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition transform duration-300 cursor-pointer"
            >
              <div className="w-full flex justify-center items-center p-2 sm:p-4">
                <img
                  src={part.image}
                  alt={part.title}
                  className="w-auto max-h-32 sm:max-h-40 md:max-h-44 object-contain"
                />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mt-2 sm:mt-4">
                {part.title}
              </h2>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 mt-10">
        © 2025 CompDZ — All Rights Reserved
      </footer>
    </div>
  );
}

