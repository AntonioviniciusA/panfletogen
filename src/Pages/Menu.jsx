import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../output.css";
import modelo from "../img/image.png";
import setaesquerda from "../img/Seta para a esquerda.png";
import setadireita from "../img/Seta para a direita.png";

const Menu = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3001/templetes.json")
      .then((Response) => Response.json())
      .then(setData);
  });

  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const carousel = useRef(null);

  const handleLeftClick = () => {
    const newIndex = currentPage === 0 ? totalPages - 1 : currentPage - 1;
    setCurrentPage(newIndex);
    carousel.current.scrollLeft -= carousel.current.clientWidth;
  };

  const handleRightClick = () => {
    const newIndex = currentPage === totalPages - 1 ? 0 : currentPage + 1;
    setCurrentPage(newIndex);
    carousel.current.scrollLeft += carousel.current.clientWidth;
  };

  const handleDotClick = (index) => {
    setCurrentPage(index);
    carousel.current.scrollLeft = carousel.current.clientWidth * index;
  };
  useEffect(() => {
    const handleScroll = () => {
      const index = Math.round(
        carousel.current.scrollLeft / carousel.current.clientWidth
      );
      setCurrentPage(index);
    };

    carousel.current.addEventListener("scroll", handleScroll);

    return () => {
      if (carousel.current) {
        carousel.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <div className="bg-white w-full flex justify-center content-center items-center gap-4 my-8">
        <div className="xl:w-2/4">
          <h3 className="xl:text-right xl:text-4xl flex sm:flex-col sm:text-center sm:m-1 sm:my-4  ">
            ECONOMIZE TEMPO E SIMPLIFIQUE <br />
            SEU TRABALHO USANDO NOSSA <br />
            FERRAMENTA E GERE AGORA MESMO FLYER/PANFLETOS
          </h3>
        </div>
        <div className=" h-auto">
          <img src={modelo} alt="" className=" rounded-2xl w-72 h-52" />
        </div>
      </div>
      <div className="bg-gray-400 h-screen flex flex-col items-center justify-center gap-4">
        <div>
          <h2 className="bg-gray-500 text-white text-xl px-4 py-1 m-2 rounded-full">
            Escolha um modelo
          </h2>
        </div>
        <div className="container-carousel bg-gray-500 flex w-full justify-center items-center">
          <button
            className="left-28 w-8 h-8 absolute "
            onClick={handleLeftClick}
          >
            <img src={setaesquerda} alt="" />
          </button>
          <div
            className="carousel overflow-x-auto scroll-smooth flex w-3/4 
             "
            ref={carousel}
          >
            {data.map((item) => {
              const { id, name, image, link } = item;
              const templeteMercado = () => {
                navigate(link);
              };
              return (
                <div
                  className="item bg-gray-600 p-6 w-1/4 h-3/4 rounded-lg gap-7
                   m-10 flex-none
                "
                  key={id}
                >
                  <div className="image m-3 w-4/4">
                    <img src={image} alt={name} />
                  </div>

                  <div className="info gap-2">
                    <p className="name">{name}</p>
                    <p className="bg-gray-500 p-3" onClick={templeteMercado}>
                      Abrir modelo
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="right-28 absolute ">
            <img
              src={setadireita}
              className="w-8 h-8"
              alt="seta para a direita"
              onClick={handleRightClick}
            />
          </button>
        </div>
      </div>
      <div className="dots absolute -bottom-96 left-0 right-0 flex justify-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              margin: "0 5px",
              borderRadius: "50%",
              backgroundColor: currentPage === index ? "blue" : "gray",
              cursor: "pointer",
            }}
          ></span>
        ))}
      </div>
      <div className="w-full h-auto flex items-center justify-around gap-2 my-8">
        <img src={modelo} alt="" className=" rounded-2xl w-72 h-52" />
        <h1>
          <strong>OUTROS PROJETOS</strong>
        </h1>
        <img src={modelo} alt="modelo" className=" rounded-2xl w-72 h-52" />
      </div>
      <Footer />
    </>
  );
};

export default Menu;
