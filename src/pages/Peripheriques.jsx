import React from "react";
import { useNavigate } from "react-router-dom";

function PeripheralsCategories() {
  const navigate = useNavigate();

  const categories = [
    { name: "Keyboard", image: "/clavier.png", path: "/peripheriques/keyboard" },
    { name: "Mouse", image: "/souris.png", path: "/peripheriques/mouse" }, // هنا رابط صفحة الماوس
    { name: "Headset", image: "/casque.png", path: "/peripheriques/casque" },
    { name: "Webcam", image: "/webcam.png", path: "/peripheriques/webcam" },
    { name: "Mouse Pad", image: "/tapis.png", path: "/peripheriques/tapis" },
    { name: "USB Drive", image: "/usb.png", path: "/peripheriques/usb" },
    { name: "Microphone", image: "/micro.png", path: "/peripheriques/micro" },
  ];

  const handleCategoryClick = (cat) => {
    if (cat.name === "Keyboard") {
      navigate("/peripheriques/keyboard"); // صفحة الكيبورد
    } else if (cat.name === "Mouse") {
      navigate("/peripheriques/mouse"); // صفحة PeripheMouse
    } else {
      navigate(cat.path);
    }
  };

  return (
    <div className="bg-[#f8f5f9] min-h-screen font-sans flex flex-col">
      {/* Header */}
      <header className="flex justify-center items-center px-6 py-6 bg-[#e9e0eb] rounded-b-3xl shadow-sm">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
          🎧 Computer Peripherals
        </h1>
      </header>

      {/* Description */}
      <section className="px-4 sm:px-6 mt-6 max-w-5xl mx-auto text-center text-gray-600 leading-relaxed">
        <p className="text-sm sm:text-base">
          Browse our selection of computer peripherals including keyboards, mice, headsets, webcams, mouse pads, USB drives, and microphones. Click a category to see the products.
        </p>
      </section>

      {/* Categories */}
      <section className="mt-8 px-4 sm:px-6 flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat)}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition transform duration-300 flex flex-col items-center"
            >
              <div className="w-full flex justify-center items-center p-4">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-32 sm:max-h-40 md:max-h-44 w-auto object-contain"
                />
              </div>
              <div className="p-2 sm:p-4 text-center">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg">
                  {cat.name}
                </h3>
              </div>
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

export default PeripheralsCategories;
