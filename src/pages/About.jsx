import React from "react";

const About = () => {
  return (
     <div className="bg-[#f8f5f9] min-h-screen font-sans">
      
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About CompDZ</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in technology and computer solutions in Algeria
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At CompDZ, we are committed to providing high-quality computer products 
            and exceptional service to our customers. Our mission is to make technology 
            accessible and affordable for everyone in Algeria, from students to professionals 
            and businesses.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="text-blue-600 text-2xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality First</h3>
            <p className="text-gray-600">
              We offer only the best products from trusted brands, ensuring reliability 
              and performance for our customers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="text-green-600 text-2xl mb-3">💝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Focus</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We provide excellent customer service 
              and technical support.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">💻</span>
              <span className="text-gray-700">Laptops & Computers</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🔧</span>
              <span className="text-gray-700">PC Components</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🖨️</span>
              <span className="text-gray-700">Printers & Accessories</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🎮</span>
              <span className="text-gray-700">Gaming Equipment</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Have questions? <a href="/contact" className="text-blue-600 hover:underline">Contact us</a>
          </p>
        </div>
      </div>

  );
};

export default About;