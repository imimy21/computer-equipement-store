import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ✅ استقبال البيانات سواء من منتج واحد أو من السلة
  const { product, products, fromCart } = location.state || {};
  
  // ✅ تحديد العناصر للدفع
  const itemsToPay = fromCart ? products : (product ? [product] : []);
  const totalAmount = fromCart 
    ? products.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    : product?.price || 0;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wilaya: "",
    municipality: "",
    address: "",
    phone: "",
    email: ""
  });

  const wilayas = [
    "Alger", "Oran", "Constantine", "Annaba", "Blida", "Tizi Ouzou",
    "Sétif", "Batna", "Djelfa", "Sidi Bel Abbès", "Biskra", "Tlemcen",
    "Ghardaïa", "Laghouat", "Mascara", "Médéa", "Mostaganem", "Msila",
    "Ouargla", "Chlef"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (itemsToPay.length === 0) {
      alert("❌ No products to order!");
      return;
    }
    
    const itemCount = fromCart ? products.length : 1;
    alert(`✅ Order confirmed! ${itemCount} product(s) will be delivered soon.`);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 w-screen max-w-none mx-0">
      <div className="w-full px-4 max-w-none mx-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wider font-serif">
          BILLING & SHIPPING
        </h1>

        <div className="grid lg:grid-cols-2 gap-6 w-full max-w-none mx-0">
          {/* Formulaire de livraison */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Prénom et Nom */}
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                    NAME *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Wilaya */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                  WILAYA *
                </label>
                <select
                  name="wilaya"
                  value={formData.wilaya}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an option...</option>
                  {wilayas.map((wilaya) => (
                    <option key={wilaya} value={wilaya}>
                      {wilaya}
                    </option>
                  ))}
                </select>
              </div>

              {/* Municipalité */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                  MUNICIPALITY *
                </label>
                <input
                  type="text"
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your municipality"
                />
              </div>

              {/* Adresse */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                  DELIVERY ADDRESS *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Street number and name"
                />
              </div>

              {/* Téléphone et Email */}
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                    PHONE *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-md font-bold text-gray-800 mb-3 uppercase tracking-wide">PAYMENT METHOD</h3>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    defaultChecked
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="cod" className="flex items-center space-x-2">
                    <span className="text-gray-700 font-medium text-sm">Payment on delivery</span>
                  </label>
                </div>
                <p className="text-gray-600 text-xs mt-1 ml-6">
                  Pay in cash upon delivery.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-md hover:bg-green-700 transition shadow-lg"
                style={{ backgroundColor: "#3498db" }}
              >
                {fromCart ? `Confirm Order (${products.length} items)` : 'Confirm Order'}
              </button>
            </form>
          </div>

          {/* Résumé de commande */}
          <div className="bg-white rounded-xl shadow-lg p-4 h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">
              {fromCart ? `YOUR ORDER (${products.length} items)` : 'YOUR ORDER'}
            </h2>
            
            {itemsToPay.length > 0 ? (
              <div className="space-y-3">
                {/* ✅ عرض جميع المنتجات */}
                {itemsToPay.map((item, index) => (
                  <div key={index} className="flex justify-between items-start border-b pb-3">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                      <p className="text-gray-600 text-xs">{item.specs}</p>
                      {fromCart && (
                        <p className="text-gray-500 text-xs mt-1">Quantity: {item.quantity}</p>
                      )}
                    </div>
                    <p className="font-semibold text-gray-800 text-sm text-right">
                      {fromCart ? (item.price * item.quantity).toLocaleString() : item.price.toLocaleString()} DA
                    </p>
                  </div>
                ))}

                {/* Sous-total */}
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">SUBTOTAL</span>
                  <span className="font-semibold text-gray-800 text-sm">{totalAmount.toLocaleString()} DA</span>
                </div>

                {/* Livraison */}
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">SHIPPING</span>
                  <span className="text-gray-600 text-xs">
                    Enter your address to see delivery options.
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between pt-3">
                  <span className="text-md font-bold text-gray-900 uppercase tracking-wide">TOTAL</span>
                  <span className="text-md font-bold text-gray-900">{totalAmount.toLocaleString()} DA</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-6 text-sm">No products selected</p>
            )}

            {/* Informations supplémentaires */}
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-1 text-sm uppercase tracking-wide">Delivery Information</h3>
              <p className="text-blue-700 text-xs">
                • Free delivery in Algiers for orders over 10,000 DA<br/>
                • Delivery within 2-3 business days<br/>
                • Cash on delivery available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;