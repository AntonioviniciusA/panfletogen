import React from "react";
import "../output.css";
import tel from "../img/whatsapplogo.png";
import emaillogo from "../img/emaillogo.png";
import logodark from "../img/logo dark.png";

const Footer = () => {
  return (
    <div className="bg-color2 gap-2 flex justify-between">
      <div className="flex items-center justify-start text-white">
        <img src={emaillogo} className="logo" alt="icone telefone" />
        <a href="mailto:antoniovinicius_@outlook.co">antonio vinicius</a>
        <br />
        <img src={tel} alt="icone telefone" className="logo" />
        <a href="tel:+55983394560">+55(61)983394550</a>
      </div>
      <div className="">
        <img src={logodark} className="logo" alt="logo" />
      </div>
      <div className="opacity-0  right-3">
        <p>&&</p>
      </div>
    </div>
  );
};
export default Footer;
