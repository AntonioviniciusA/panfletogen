import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FrontForm from "./FrontForm";
import BackForm from "./BackForm";
import "../style.css";

const FormPage = () => {
  const [activeTab, setActiveTab] = useState("front");
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSavePanfleto = () => {
    navigate("/cards");
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Configuração do Panfleto</h1>
        <div>
          <button
            onClick={() => handleTabChange("front")}
            className={activeTab === "front" ? "active" : ""}
          >
            Frente
          </button>
          <button
            onClick={() => handleTabChange("back")}
            className={activeTab === "back" ? "active" : ""}
          >
            Verso
          </button>
        </div>
        <div>
          {activeTab === "front" && <FrontForm />}
          {activeTab === "back" && <BackForm />}
        </div>
        <button onClick={handleSavePanfleto}>
          Salvar Panfleto e Visualizar
        </button>
      </div>
    </div>
  );
};

export default FormPage;
