import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import "./style.css";
import "./tailwind.config";
import Menu from "./Pages/Menu";
import Templetemercado from "./Pages/Templetemercado";
import CertificateGenerator from "./Pages/Certificado";
import InstagramPostGenerator from "./Pages/InstagramPostGenerator";
import Teste from "./Pages/Teste";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/mercado-templete" element={<Templetemercado />} />
        <Route path="/certificado" element={<CertificateGenerator />} />
        <Route path="/post" element={<InstagramPostGenerator />} />
        <Route path="/teste" element={<Teste />} />
      </Routes>
    </Router>
  );
}

export default App;
