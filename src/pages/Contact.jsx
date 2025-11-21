import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will contact you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
 <div className="min-h-screen w-screen overflow-x-hidden bg-[#faf8fc]">
  <div className="max-w-screen-xl mx-auto px-6 py-12">
   

    

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mt-3">
          Get in touch with our team – we're here to help you!
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-2 gap-10">

        {/* Left Form */}
        <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="What is this regarding?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition font-medium"
              style={{
                backgroundColor: "#3498db",
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Info */}
        <div className="space-y-6">
          {/* Card */}
          <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Contact Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="text-3xl">📧</span>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-500">contact@compdz.dz</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl">📞</span>
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <p className="text-gray-500">+213 XXX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="font-medium text-gray-800">Address</p>
                  <p className="text-gray-500">Algiers, Algeria</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl">🕒</span>
                <div>
                  <p className="font-medium text-gray-800">Business Hours</p>
                  <p className="text-gray-500">Sunday - Thursday: 8:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Help
            </h3>

            <p className="text-gray-600">
              <strong>Technical Support:</strong> support@compdz.dz
            </p>
            <p className="text-gray-600">
              <strong>Sales Inquiries:</strong> sales@compdz.dz
            </p>
            <p className="text-gray-600 mt-2">
              We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
     </div>
     
  );
};

export default Contact;
