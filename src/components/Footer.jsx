import React from "react";
import "../output.css";

const Footer = () => {
  return (
    <div className="bg-white gap-2 flex justify-between">
      <div>
        <img src="" alt="icone telefone" />
        <a href="mailto:antoniovinicius_@outlook.com">
          antoniovinicius_@outlook.com
        </a>
        <br />
        <img src="" alt="icone telefone" />
        <a href="tel:+55983394560">+55(61)983394560</a>
      </div>
      <div className="">
        <img src="" alt="logo" />
      </div>
      <div className="opacity-0  right-3">
        <p>&&</p>
      </div>
    </div>
  );
};
export default Footer;
