import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import PrintersPage from "./pages/PrintersPage";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'printers') {
    return <PrintersPage onBack={() => setCurrentPage('home')} />;
  }

  return <HomePage onNavigateToPrinters={() => setCurrentPage('printers')} />;
}

export default App;

