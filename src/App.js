import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./output.css";
import "./style.css";
import "./tailwind.config";
import Menu from "./Pages/Menu";
import Templetemercado from "./Pages/Templetemercado";
import DragHandler from "./components/testedrag";
import TemplateDashBoard from "./Pages/templete-dashboard";
import SQLDashBoard from "./Pages/SQLDashBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/mercado-templete" element={<Templetemercado />} />
        <Route path="/teste" element={<DragHandler />} />
        <Route path="/TemplateDashBoard" element={<TemplateDashBoard />} />
        <Route path="/SQLDashBoard" element={<SQLDashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
