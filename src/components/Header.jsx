import React from "react";
import "../output.css";
import logodarkctitulo from "../img/logo dark c titulo.png";
import netlifyIdentity from "netlify-identity-widget";

const Header = () => {
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  const handleLogin = () => {
    netlifyIdentity.open();
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
            onClick={handleLogin}
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
