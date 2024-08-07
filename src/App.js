import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardsPage from "./components/CardsPage";
import FormPage from "./components/FormPage";
import "./style.css";
import "./tailwind.css";
import Menu from "./Pages/Menu";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/teste" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
