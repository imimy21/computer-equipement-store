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
  );
}

export default App;
