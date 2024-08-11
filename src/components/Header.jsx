import React from "react";
import "../output.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate;
  const navLogin = () => {
    navigate("");
  };
  const navRegistrar = () => {
    navigate("");
  };

  return (
    <div className="bg-white flex gap-5 flex-col">
      <div className="bg-gray-300 absolute flex flex-row xl:justify-between w-full">
        <div className="flex flex-row">
          <img className="rounded-full m-2" src="" alt="Logo" />
          <h1 className="m-2">FLYER.GEN</h1>
        </div>
        <div>
          <button
            onClick={navLogin}
            className="bg-gray-400  m-2 px-3 text-white rounded-xl"
          >
            LOGIN
          </button>
          <button
            onClick={navRegistrar}
            className="bg-gray-500 px-3 m-2 text-white rounded-xl"
          >
            RESGISTRAR
          </button>
        </div>
      </div>
      <div className="bg-gray-600 rounded-md flex flex-col items-center justify-end p-3 h-56 w-full   my-4">
        <div className=" flex  text-white text-4xl text-center">
          <h1>
            CONHEÇA JÁ NOSSO <br /> GERADOR DE PANFLETOS
          </h1>
        </div>
        <h3 className="bg-gray-300  px-4 py-1 m-2 rounded-full">GERADOR</h3>
      </div>
    </div>
  );
};

export default Header;
