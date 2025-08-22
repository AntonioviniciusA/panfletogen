import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import "./style.css";
import "./tailwind.config";
import Menu from "./Pages/Menu";
import Templetemercado from "./Pages/Templetemercado";
import CertificateGenerator from "./Pages/Certificado";
import InstagramPostGenerator from "./Pages/InstagramPostGenerator";
import EditAudio from "./Pages/EditAudio";
import ImageConvention from "./Pages/ImageConvention";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/mercado-templete" element={<Templetemercado />} />
        <Route path="/certificado" element={<CertificateGenerator />} />
        <Route path="/post" element={<InstagramPostGenerator />} />
        <Route path="/edit-audio" element={<EditAudio />} />
        <Route path="/image-converter" element={<ImageConvention />} />
      </Routes>
    </Router>
  );
}

export default App;
