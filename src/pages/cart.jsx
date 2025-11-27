import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // ✅ إضافة

const Cart = ({ showPanier, setShowPanier }) => {
  const { panier, updateQuantity, removeFromPanier, total } = useCart();
  const navigate = useNavigate(); // ✅ إضافة

  if (!showPanier) return null;

  // ✅ دالة جديدة للانتقال لصفحة الدفع
  const handleCheckout = () => {
    if (panier.length > 0) {
      navigate("/payment", { 
        state: { 
          products: panier, // ✅ إرسال جميع المنتجات في السلة
          fromCart: true // ✅ للإشارة أن الدفع من السلة
        } 
      });
      setShowPanier(false); // ✅ إغلاق السلة
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        style={{
          background: "rgba(0, 0, 0, 0.15)",
        }}
        onClick={() => setShowPanier(false)}
      />

      {/* السلة */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white w-full sm:w-[400px] h-full p-6 flex flex-col shadow-2xl overflow-y-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
            <button
              onClick={() => setShowPanier(false)}
              className="text-red-500 text-lg font-bold"
            >
              ✕
            </button>
          </div>

          {/* المنتجات */}
          <div className="flex-1 space-y-6">
            {panier.length === 0 ? (
              <p className="text-gray-500 text-center text-lg mt-20">
                Your cart is empty.
              </p>
            ) : (
              panier.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-red-500 font-bold">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-200 px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, +1)}
                        className="bg-gray-200 px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromPanier(item.id)}
                    className="text-red-500 text-lg"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Total + Checkout */}
          {panier.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* ✅ تغيير زر Checkout */}
             <button
  onClick={handleCheckout}
  className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
  style={{ backgroundColor: "#27ae60" }} // ✅ إضافة اللون الأخضر
>
  Checkout ({panier.length} items)
</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart ;