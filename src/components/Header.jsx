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
      <div className="bg-color2 absolute flex flex-row xl:justify-between items-center w-full">
        <div className="flex flex-row h-16 ">
          <img className=" w-auto h-fit m-2" src={logodarkctitulo} alt="Logo" />
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
      <div className="bgimage rounded-md flex flex-col items-center justify-end p-3 h-56 w-full   my-4">
        <div className=" flex  text-white text-4xl text-center gugi-regular">
          <h1>
            CONHEÇA JÁ NOSSO <br /> GERADOR DE PANFLETOS
          </h1>
        </div>
        <a
          href="#carousel"
          className="bg-color2 text-white kanit-regular  px-4 py-1 m-2 rounded-full"
        >
          GERADOR
        </a>
      </div>
    </div>
  );
};

export default Header;
