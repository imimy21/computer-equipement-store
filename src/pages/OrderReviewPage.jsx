import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";



const OrderReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Get data from Payment page
  const { products, userData, fromCart } = location.state || {};

  if (!products || products.length === 0) {
    return (
      <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">No Order Data Available!</h2>
          <p className="text-gray-600 mb-6">Please go back and add items to your cart first.</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Go Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Calculate total amount
  const totalAmount = products.reduce(
  (sum, item) => sum + item.price * (item.quantity || 1),
  0
);


  // Calculate tax (example: 10%)
  const taxAmount = totalAmount * 0.1;
  const finalAmount = totalAmount + taxAmount;

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);

     const simplifiedProducts = products.map((item) => ({
  productName: item.name,
  productPrice: item.price,
  quantity: item.quantity || 1,
  totalItemPrice: item.price * (item.quantity || 1)
}));


      await addDoc(collection(db, "orders"), {
        studentName: `${userData.firstName} ${userData.lastName}`,
        studentEmail: userData.email,
        userId: userData.uid || "",
        products: simplifiedProducts,
        total: finalAmount,
        paymentStatus: "Pending",
        registeredAt: serverTimestamp(),
        orderType: fromCart ? "Cart Purchase" : "Single Product",
        taxAmount: taxAmount,
        subtotal: totalAmount
      });

      setOrderConfirmed(true);
      
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
      
    } catch (error) {
      console.error("Error saving order:", error);
      alert("❌ Failed to save order. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center animate-pulse">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Order Confirmed! 🎉</h2>
          <p className="text-gray-600 mb-2">Thank you for your purchase!</p>
          <p className="text-gray-600 mb-6">Order total: <span className="font-bold text-green-600">{finalAmount.toLocaleString()} DA</span></p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-500 text-sm">You will be redirected to the homepage in 3 seconds...</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full animate-progress"></div>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
          >
            Go to Homepage Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto min-h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Order Review & Confirmation</h1>
          <p className="text-gray-600">Please review your order details before confirming</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 flex-grow">
          {/* Left Column - Customer Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
            <h2 className="text-xl font-bold mb-6 pb-3 border-b border-gray-200 text-gray-900 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Customer Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-900">{userData.firstName} {userData.lastName}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89-6.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-semibold text-gray-900 break-all">{userData.email}</p>
                </div>
              </div>

             

              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Order Type</p>
                  <p className="font-semibold text-gray-900">{fromCart ? "Cart Purchase" : "Single Product"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Products List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-6 pb-3 border-b border-gray-200 text-gray-900 flex items-center">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Order Details ({products.length} {products.length === 1 ? 'Item' : 'Items'})
            </h2>

            <div className="overflow-x-auto flex-grow">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-gray-700 font-semibold">Product</th>
                    <th className="text-center py-3 px-2 text-gray-700 font-semibold">Quantity</th>
                    <th className="text-center py-3 px-2 text-gray-700 font-semibold">Unit Price</th>
                    <th className="text-center py-3 px-2 text-gray-700 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">
                          {fromCart ? item.quantity : 1}
                        </span>
                      </td>
                      <td className="text-center py-4 px-2">
                        <span className="font-medium text-gray-700">{item.price.toLocaleString()} DA</span>
                      </td>
                      <td className="text-center py-4 px-2">
                        <span className="font-bold text-gray-900">
                         {(item.price * (item.quantity || 1)).toLocaleString()} DA

                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{totalAmount.toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium text-gray-900">{taxAmount.toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                  <span className="text-xl font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">{finalAmount.toLocaleString()} DA</span>
                </div>
              </div>

              {/* Payment Status */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-yellow-800">Payment Status: Pending</span>
                </div>
                <p className="text-sm text-yellow-600 mt-1">Payment will be completed after order confirmation</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
                Edit Order
              </button>
              <button
                onClick={handleConfirmOrder}
                disabled={loading}
                className={`flex-1 px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center ${
                  loading 
                    ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Confirm & Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm pb-4">
          <p>By confirming this order, you agree to our terms and conditions.</p>
          <p className="mt-1">Order will be processed immediately after confirmation.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default OrderReviewPage;





