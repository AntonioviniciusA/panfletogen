import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import "./style.css";
import "./tailwind.config";
import Menu from "./Pages/Menu";
import Templetemercado from "./Pages/Templetemercado";
import Panfletomercado from "./Pages/Panfletomercado";
import DragHandler from "./components/testedrag";
import FileUpload from "./components/FileUpload";
import TemplateDashBoard from "./Pages/templete-dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/mercado-templete" element={<Templetemercado />} />
        <Route path="/panfleto-mercado" element={<Panfletomercado />} />
        <Route path="/teste" element={<DragHandler />} />
        <Route path="/dashboard" element={<TemplateDashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
