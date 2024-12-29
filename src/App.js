import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import "./style.css";
import "./tailwind.config";
import Menu from "./Pages/Menu";
import Templetemercado from "./Pages/Templetemercado";
import CertificateGenerator from "./Pages/Certificado";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/mercado-templete" element={<Templetemercado />} />
        <Route path="/certificado" element={<CertificateGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
