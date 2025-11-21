import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
     <div className="fixed inset-0 z-50">
      {/* طبقة شفافة - خفيفة وجميلة */}
      <div
  className="fixed inset-0 z-40"
  style={{ background: "transparent" }}
  onClick={onClose}
/>
      
      
      
      {/* القائمة */}
       <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-lg p-6 overflow-y-auto z-50">
        {/* رأس القائمة */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* عناصر القائمة */}
        <nav className="space-y-2">
          {/* الصفحة الرئيسية */}
          <Link 
            to="/" 
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            onClick={onClose}
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>

          {/* المنتجات */}
        <div className="flex items-center gap-3 p-3 text-gray-700 font-bold">
  <span>🖥️</span>
  <span>Products</span>
</div>

         

          {/* حواسيب محمولة */}
          <Link 
            to="/PCStore" 
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition ml-4"
            onClick={onClose}
          >
            <span>📱</span>
            <span>Laptops</span>
          </Link>

          {/* شاشات */}
         
 <Link 
            to="/Monitor" 
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
            onClick={onClose}
          >
            <span>📺</span>
            <span>Monitors</span>
          </Link>

          {/* قطع الكمبيوتر */}
         
 <Link 
            to="/composants" 
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
            onClick={onClose}
          >
            <span>🔧</span>
            <span>PC Components</span>
          </Link>
          {/* Peripherals & Accessories */}
<Link 
  to="/peripheriques" 
  className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
  onClick={onClose}
>
  <span>⌨️</span>
  <span>Peripherals & Accessories</span>
</Link>
{/* Printer */}
<Link 
  to="/printers" 
  className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
  onClick={onClose}
>
  <span>🖨️</span>
  <span>Printers</span>
</Link>
{/* Computer Cases */}
<Link 
 to="/computer-cases"  
  className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
  onClick={onClose}
>
  <span>🖥️</span>
  <span>Computer Cases</span>
</Link>
{/* Cables & Adapters */}
<Link 
  to="/cables"
  className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
  onClick={onClose}
>
  <span>🔌</span>
  <span>Cables & Adapters</span>
</Link>
{/* Gaming Zone */}
<Link 
  to="/gaming-zone" 
  className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-all duration-200 ml-4 text-sm"
  onClick={onClose}
>
  <span>🎮</span>
  <span>Gaming Zone</span>
</Link>




           {/* من نحن - About Us */}
          <Link 
            to="/about" 
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            onClick={onClose}
          >
            <span>ℹ️</span>
            <span>About Us</span>
          </Link>

         
          {/* اتصل بنا */}
            <Link 
            to="/contact" 
            className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            onClick={onClose}
          >
            <span>📞</span>
            <span>Contact</span>
          </Link>
         

          {/* السلة */}
          
         
          
        </nav>
      </div>
    </div>
  );
};

export default Navbar;