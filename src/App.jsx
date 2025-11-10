import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Peripheriques from "./pages/Peripheriques";
import Composants from "./pages/Composants";
import PrintersPage from "./pages/PrintersPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحات الرئيسية */}
        <Route path="/" element={<HomePage />} />
        <Route path="/peripheriques" element={<Peripheriques />} />
        <Route path="/composants" element={<Composants />} />
        <Route path="/printers" element={<PrintersPage />} />

        {/* إعادة التوجيه لأي صفحة غير موجودة */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
