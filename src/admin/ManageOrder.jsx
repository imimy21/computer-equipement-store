import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("registeredAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const ordersData = [];
        querySnapshot.forEach((doc) => {
          ordersData.push({ id: doc.id, ...doc.data() });
        });
        setOrders(ordersData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    return new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp).toLocaleString();
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-xl font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">No Orders Found</h2>
          <p className="text-gray-600 mb-6">There are no orders in the system yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto min-h-full">
        {/* Header */}
        <div className="mb-8 text-center pt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">Total Orders: {orders.length}</p>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
            <p className="text-gray-600 mt-2">All Orders</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <p className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.paymentStatus === 'paid' || o.paymentStatus === 'completed').length}
            </p>
            <p className="text-gray-600 mt-2">Paid</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <p className="text-3xl font-bold text-yellow-600">
              {orders.filter(o => o.paymentStatus === 'pending').length}
            </p>
            <p className="text-gray-600 mt-2">Pending</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <p className="text-3xl font-bold text-red-600">
              {orders.filter(o => o.paymentStatus === 'failed' || o.paymentStatus === 'cancelled').length}
            </p>
            <p className="text-gray-600 mt-2">Cancelled</p>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Order Header with Status */}
              <div className={`p-5 ${getStatusColor(order.paymentStatus)}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-white">Order #{order.id.substring(0, 8)}</h2>
                    <p className="text-white/90 text-sm mt-1">{formatDate(order.registeredAt)}</p>
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold text-white">
                    {getStatusText(order.paymentStatus)}
                  </span>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-5">
                {/* Student Info */}
                <div className="mb-5 pb-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Student Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-800">{order.studentName || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-800 truncate max-w-[200px]">{order.studentEmail || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">User ID:</span>
                      <span className="font-medium text-gray-800 text-sm">{order.userId || "Not specified"}</span>
                    </div>
                  </div>
                </div>

                {/* Products Summary */}
                <div className="mb-5">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    Products ({order.products?.length || 0})
                  </h3>
                  
                  {expandedOrder === order.id ? (
                    // Expanded View
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                      {order.products?.map((p, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium text-gray-800">{p.productName}</p>
                            <p className="font-bold text-blue-600">
                              {(p.productPrice * p.quantity).toLocaleString()} DA
                            </p>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Quantity: {p.quantity}</span>
                            <span>Unit Price: {p.productPrice?.toLocaleString()} DA</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Collapsed View
                    <div className="space-y-2">
                      {order.products?.slice(0, 2).map((p, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <p className="text-gray-700 truncate max-w-[70%]">
                            {p.productName} × {p.quantity}
                          </p>
                          <p className="font-semibold text-gray-800">
                            {(p.productPrice * p.quantity).toLocaleString()} DA
                          </p>
                        </div>
                      ))}
                      {order.products?.length > 2 && (
                        <p className="text-blue-500 text-sm mt-2">
                          + {order.products.length - 2} more products
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Total and Actions */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {order.total?.toLocaleString()} DA
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center hover:shadow-md"
                    >
                      {expandedOrder === order.id ? "Show Less" : "View Details"}
                    </button>
                    
                    <button className="px-4 bg-green-50 text-green-600 hover:bg-green-100 py-3 rounded-lg font-medium transition-all duration-200 flex items-center hover:shadow-md">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {formatDate(order.registeredAt)}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(order.paymentStatus)}`}>
                    {getStatusText(order.paymentStatus)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 pb-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Last Updated: {new Date().toLocaleString()}</p>
          <p className="mt-1">Total Orders Displayed: {orders.length}</p>
        </div>
      </div>
    </div>
  );
};

// Helper functions for status colors
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'paid':
    case 'completed':
      return 'bg-gradient-to-r from-green-500 to-emerald-600';
    case 'pending':
      return 'bg-gradient-to-r from-yellow-500 to-amber-600';
    case 'failed':
    case 'cancelled':
      return 'bg-gradient-to-r from-red-500 to-rose-600';
    default:
      return 'bg-gradient-to-r from-gray-500 to-gray-600';
  }
};

const getStatusBadgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'paid':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status) => {
  const statusMap = {
    'paid': 'Paid',
    'completed': 'Completed',
    'pending': 'Pending',
    'failed': 'Failed',
    'cancelled': 'Cancelled'
  };
  return statusMap[status?.toLowerCase()] || status || 'Unknown';
};

export default ManageOrder;




