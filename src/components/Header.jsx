import React, { useEffect, useState } from "react";
import "../output.css";
import logodarkctitulo from "../img/logo dark c titulo.png";
import netlifyIdentity from "netlify-identity-widget";

const Header = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    netlifyIdentity.init();
    netlifyIdentity.on("login", (user) => {
      setUser(user);
    });
    netlifyIdentity.on("logout", () => {
      setUser(null);
    });
  }, []);

  const handleLogin = () => {
    netlifyIdentity.open();
  };

  const handleLogout = () => {
    netlifyIdentity.logout();
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
          {user ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              {" "}
              <button
                onClick={handleLogin}
                className="bg-color1  m-2  gugi-regular px-3 text-white rounded-xl"
              >
                LOGIN
              </button>
            </li>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
