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
import PeripheProcessor from "./pages/PeripheProcessor";

import PeripheUSB from "./pages/PeripheUSB";
import PeripheWebcam from './pages/PeripheWebcam';
import PeripheHeadset from './pages/PeripheHeadset';
import PeripheMicrophone from './pages/PeripheMicrophone';
import PeripheMousePad from './pages/PeripheMousePad';
import PeripheMotherboard from './pages/PeripheMotherboard';
import PeripheRAM from "./pages/PeripheRAM";
import PeripheGPU from "./pages/PeripheGPU";
import PeripheSSD from "./pages/PeripheSSD";
import PeripheHardDrive from "./pages/PeripheHardDrive";
import PeripheCable from './pages/PeripheCable';
import ComputerCasesPage from './pages/ComputerCasesPage'; 
import GamingZonePage from './pages/GamingZonePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Payment from "./pages/Payment";



function App() {
  return (
    <CartProvider>
      <Router>
       
        <Routes>

          {/* Main pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/peripheriques" element={<Peripheriques />} />
          <Route path="/peripheriques/keyboard" element={<PeripheKeyboard />} />
          <Route path="/peripheriques/mouse" element={<PeripheMouse />} />
          <Route path="/composants" element={<Composants />} />
          <Route path="/printers" element={<PrintersPage />} />
          <Route path="/PCStore" element={<PCStore />} />
          <Route path="/ModalLogin" element={<ModalLogin />} />
          <Route path="/Monitor" element={<MonitorPage />} />


          {/* Your added pages */}
          <Route path="/PeripheProcessor" element={<PeripheProcessor />} />
           <Route path="/PeripheMotherboard" element={<PeripheMotherboard />} />
           <Route path="/PeripheRAM" element={<PeripheRAM />} />
           <Route path="/PeripheGPU" element={<PeripheGPU />} />
           <Route path="/PeripheSSD" element={<PeripheSSD />} />
           <Route path="/PeripheHardDrive" element={<PeripheHardDrive />} />

          {/* Other peripherals */}
          <Route path="/peripheriques/USB Drive" element={<PeripheUSB />} />
          <Route path="/peripheriques/Webcam" element={<PeripheWebcam />} />
          <Route path="/peripheriques/Headset" element={<PeripheHeadset />} />
          <Route path="/peripheriques/Microphone" element={<PeripheMicrophone />} />
          <Route path="/peripheriques/Mouse Pad" element={<PeripheMousePad />} />
          <Route path="/Payment" element={<Payment />} />

          {/* Redirect unknown routes */}
=======
          <Route path="/peripheriques/USB Drive" element={<PeripheUSB />} />
         <Route path="/peripheriques/Webcam" element={<PeripheWebcam/>} />
         <Route path="/peripheriques/Headset" element={<PeripheHeadset/>} />
         <Route path="/peripheriques/Microphone" element={<PeripheMicrophone/>} />
         <Route path="/peripheriques/Mouse Pad" element={<PeripheMousePad/>} />
        <Route path="/cables" element={<PeripheCable />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


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
