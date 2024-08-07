import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardsPage from "./components/CardsPage";
import FormPage from "./components/FormPage";
import "./style.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/cards" element={<CardsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
