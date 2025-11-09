<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Peripheriques from "./pages/Peripheriques";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/peripheriques" element={<Peripheriques />} />
      </Routes>
    </Router>
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Composants from "./pages/composants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/composants" element={<Composants />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 9f86a54265ee33baac7c25d0b828856f5c571807
  );
}

export default App;
