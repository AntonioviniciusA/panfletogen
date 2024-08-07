import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../tailwind.css";

const Menu = () => {
  return (
    (<Header />),
    (
      <div className="bg-gray-300">
        <div>
          <h2>Escolha um modelo</h2>
        </div>
        <div>Carrocel</div>
      </div>
    ),
    (<Footer />)
  );
};

export default Menu;
