import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../output.css";
import modelo from "../img/modelo.png";
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

  const carousel = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const updateItemsPerPage = () => {
    if (window.innerWidth < 640) {
      setItemsPerPage(1); // 1 item por página em telas pequenas
    } else if (window.innerWidth < 1024) {
      setItemsPerPage(1);
    } else {
      setItemsPerPage(3); // 3 itens por página em telas grandes
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

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
      <div className="bg-color3 w-full xl:flex xl:justify-center xl:content-center xl:items-center xl:gap-4 my-8">
        <div className="xl:w-2/4">
          <h3
            className="xl:text-right xl:text-4xl md:flex md:flex-col md:text-center md:m-1 md:my-4
          text-center"
          >
            ECONOMIZE TEMPO E SIMPLIFIQUE <br />
            SEU TRABALHO USANDO NOSSA <br />
            FERRAMENTA E GERE AGORA MESMO FLYER/PANFLETOS
          </h3>
        </div>
        <div className=" h-auto xl:w-2/4 flex my-3 items-center justify-center  ">
          <img src={modelo} alt="" className=" rounded-2xl w-5/5 h-52" />
        </div>
      </div>
      <div
        id="carousel"
        className="bg-color2 h-fit w-full flex flex-col items-center justify-center gap-4"
      >
        <div>
          <h2 className="bg-color1 text-white text-xl px-4 py-1 m-2 rounded-full">
            Escolha um modelo
          </h2>
        </div>
        <div className="container-carousel bg-color1opct40 xl:flex xl:w-full xl:justify-center w-full h-fit flex flex-col items-center">
          <button
            className="left-28 w-8 h-8 absolute "
            onClick={handleLeftClick}
          >
            <img src={setaesquerda} alt="" />
          </button>
          <div
            className="carousel overflow-x-auto scroll-smooth flex w-3/4 h-fit
             "
            ref={carousel}
          >
            {data.map((item) => {
              const { id, name, image, link } = item;
              const pageForm = () => {
                navigate(link);
              };
              return (
                <div
                  className="item bg-color1 p-2 pb-0 sm:w-10/12  flex flex-col sm:justify-center w-3/4  lg:w-1/4 h-fit rounded-lg gap-3
                   m-10 flex-none
                "
                  key={id}
                >
                  <div className="image m-3">
                    <img src={image} alt={name} />
                  </div>

                  <div className="info gap-2 w-full flex flex-col items-center">
                    <p className="name">{name}</p>
                    <button
                      className="bg-color1 rounded-full button p-3"
                      onClick={pageForm}
                    >
                      Abrir modelo
                    </button>
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
      <div className="w-full xl:flex-row flex items-center xl:h-fit h-fit xl:justify-around flex-col gap-2 my-8">
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
