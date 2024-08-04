import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontForm from "./components/FrontForm";
import CardsPage from "./components/CardsPage";
import "./style.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontForm />} />
        <Route path="/cards" element={<CardsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
