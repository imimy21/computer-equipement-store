import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // بيانات من المنتج أو السلة
  const { product, products, fromCart } = location.state || {};

  const itemsToPay = fromCart
  ? products
  : product
  ? [product]
  : [
      {
        id: "mock-1",
        name: "منتج تجريبي",
        price: 1000,
        quantity: 1,
        specs: "وصف المنتج التجريبي",
        stock: 10
      }
    ];


  const totalAmount = fromCart
    ? products.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    : product?.price || 0;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wilaya: "",
    municipality: "",
    address: "",
    phone: "",
    email: "",
  });

  const wilayas = [
    "Alger",
    "Oran",
    "Constantine",
    "Annaba",
    "Blida",
    "Tizi Ouzou",
    "Sétif",
    "Batna",
    "Djelfa",
    "Sidi Bel Abbès",
    "Biskra",
    "Tlemcen",
    "Ghardaïa",
    "Laghouat",
    "Mascara",
    "Médéa",
    "Mostaganem",
    "Msila",
    "Ouargla",
    "Chlef",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


/*  <<<<<<< HEAD
const handleSubmit = (e) => {
  e.preventDefault();

  if (itemsToPay.length === 0) {
    alert("❌ No products to order!");
    return;
  }

  // إرسال البيانات إلى صفحة مراجعة الطلب
  navigate("/order-review", {
    state: {
      products: itemsToPay,   // جميع المنتجات + الكمية
      userData: formData,     // معلومات العميل
      fromCart: fromCart      // هل الطلب من السلة؟
    }
  });
};


=======*/
  // ⬇⬇⬇ دالة حفظ الطلب والتحقق من الـ stock


const handleSubmit = async (e) => {
  e.preventDefault();

  if (itemsToPay.length === 0) {
    alert("❌ No products to order!");
    return;
  }

  try {
    // جمع بيانات الطلب
    const orderData = {
      products: itemsToPay.map(item => ({
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price || 0
      })),
      userData: formData,
      totalAmount,
      timestamp: serverTimestamp()
    };

    // إرسال الطلب إلى Firestore مباشرة
    await addDoc(collection(db, "orders"), orderData);

    // حفظ مؤقتًا أو أي شيء آخر (اختياري)
    localStorage.setItem("currentOrder", JSON.stringify(orderData));

    // الانتقال إلى صفحة مراجعة الطلب
    navigate("/order-review", { state: orderData });

    alert("✅ Order submitted successfully!");
  } catch (error) {
    console.error("Error submitting order:", error);
    alert("❌ Something went wrong while submitting your order.");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-6 w-screen max-w-none mx-0">
      <div className="w-full px-4 max-w-none mx-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wider font-serif">
          BILLING & SHIPPING
        </h1>

        <div className="grid lg:grid-cols-2 gap-6 w-full max-w-none mx-0">
          {/* FORM */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAME FIELDS */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* WILAYA */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                  WILAYA *
                </label>
                <select
                  name="wilaya"
                  value={formData.wilaya}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select…</option>
                  {wilayas.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              {/* MUNICIPALITY */}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* ADDRESS */}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* PHONE & EMAIL */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* PAYMENT */}
              <div className="border-t pt-4">
                <h3 className="text-md font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  PAYMENT METHOD
                </h3>

                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    defaultChecked
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="cod"
                    className="flex items-center space-x-2"
                  >
                    <span className="text-gray-700 font-medium text-sm">
                      Payment on delivery
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold text-md hover:bg-blue-600 transition shadow-lg"
              >
                {fromCart
                  ? `Confirm Order (${products.length} items)`
                  : "Confirm Order"}
              </button>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-xl shadow-lg p-4 h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">
              {fromCart
                ? `YOUR ORDER (${products.length} items)`
                : "YOUR ORDER"}
            </h2>

            {itemsToPay.length > 0 ? (
              <div className="space-y-3">
                {itemsToPay.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {item.specs}
                      </p>

                      {fromCart && (
                        <p className="text-gray-500 text-xs mt-1">
                          Quantity: {item.quantity}
                        </p>
                      )}
                    </div>

                    <p className="font-semibold text-gray-800 text-sm text-right">
                      {fromCart
                        ? (item.price * item.quantity).toLocaleString()
                        : item.price.toLocaleString()}{" "}
                      DA
                    </p>
                  </div>
                ))}

                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-700 text-sm uppercase">
                    SUBTOTAL
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {totalAmount.toLocaleString()} DA
                  </span>
                </div>

                <div className="flex justify-between pt-3">
                  <span className="text-md font-bold text-gray-900 uppercase">
                    TOTAL
                  </span>
                  <span className="text-md font-bold text-gray-900">
                    {totalAmount.toLocaleString()} DA
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-6 text-sm">
                No products selected
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
