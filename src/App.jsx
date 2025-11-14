import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Peripheriques from "./pages/Peripheriques";
import Composants from "./pages/Composants";
import PrintersPage from "./pages/PrintersPage";
import PCStore from "./pages/PCStore";
import PeripheKeyboard from "./pages/periphekeyboard";
import PeripheMouse from "./pages/PeripheMouse";
import ModalLogin from "./pages/ModalLogin";
import { CartProvider } from './context/CartContext';
import MonitorPage from "./pages/Monitor";
import PeripheUSB from "./pages/PeripheUSB";
import PeripheWebcam from './pages/PeripheWebcam';
import PeripheHeadset from './pages/PeripheHeadset';
import PeripheMicrophone from './pages/PeripheMicrophone';
import PeripheMousePad from './pages/PeripheMousePad';
import ComputerCasesPage from './pages/ComputerCasesPage'; 
import GamingZonePage from './pages/GamingZonePage';
function App() {
  return (
    <CartProvider> {/* ✅ يجب أن يكون في أعلى مستوى */}
      <Router>
        <Routes>
          {/* الصفحات الرئيسية */}
          <Route path="/" element={<HomePage />} />
          <Route path="/peripheriques" element={<Peripheriques />} />
          <Route path="/peripheriques/keyboard" element={<PeripheKeyboard />} />
          <Route path="/peripheriques/mouse" element={<PeripheMouse />} />
          <Route path="/composants" element={<Composants />} />
          <Route path="/printers" element={<PrintersPage />} />
          <Route path="/PCStore" element={<PCStore />} />
          <Route path="/ModalLogin" element={<ModalLogin />} />
          <Route path="/Monitor" element={<MonitorPage />} />
          <Route path="/peripheriques/USB Drive" element={<PeripheUSB />} />
         <Route path="/peripheriques/Webcam" element={<PeripheWebcam/>} />
         <Route path="/peripheriques/Headset" element={<PeripheHeadset/>} />
         <Route path="/peripheriques/Microphone" element={<PeripheMicrophone/>} />
         <Route path="/peripheriques/Mouse Pad" element={<PeripheMousePad/>} />
         <Route path="/computer-cases" element={<ComputerCasesPage />} />
         <Route path="/gaming-zone" element={<GamingZonePage />} />
          {/* إعادة التوجيه لأي صفحة غير موجودة */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;