
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Peripheriques from "./pages/Peripheriques";
import Composants from "./pages/composants";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/peripheriques" element={<Peripheriques />} />
        <Route path="/composants" element={<Composants />} />
      </Routes>
    </Router>
  );

}

export default App;

