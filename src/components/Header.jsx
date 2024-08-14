import React from "react";
import "../output.css";
import { useNavigate } from "react-router-dom";
import logodarkctitulo from "../img/logo dark c titulo.png";

const Header = () => {
  const navigate = useNavigate;
  const navLogin = () => {
    navigate("");
  };
  const navRegistrar = () => {
    navigate("");
  };

  return (
    <div className="bg-color3 flex gap-5 flex-col">
      <div className="bg-color2 flex flex-row xl:justify-between items-center w-full">
        <div className="logoheader">
          <a href="https://flyergen.netlify.app/">
            <img className="logoimg" src={logodarkctitulo} alt="Logo" />
          </a>
        </div>
        <div>
          <button
            onClick={navLogin}
            className="bg-color1  m-2  gugi-regular px-3 text-white rounded-xl"
          >
            LOGIN
          </button>
          <button
            onClick={navRegistrar}
            className="bg-color1 px-3 gugi-regular m-2 text-white rounded-xl"
          >
            RESGISTRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
