import { useEffect, useState } from "react";
import "@fontsource/roboto";

const Panfletomercado = () => {
  const [frontContent, setFrontContent] = useState({});
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    const savedFrontContent = JSON.parse(localStorage.getItem("frontContent"));

    if (savedFrontContent) {
      setFrontContent(savedFrontContent);
    }
  }, []);
  return (
    <div className="container">
      <h1>Vizualização</h1>
      <div>
        <button
          onClick={() => setShowFront(true)}
          className={showFront ? "active" : ""}
        >
          Frente
        </button>
        <button
          onClick={() => setShowFront(false)}
          className={!showFront ? "active" : ""}
        >
          Verso
        </button>
      </div>
      <div id="front-page" className="page">
        {frontContent.headerData && (
          <header
            style={{
              backgroundColor: frontContent.headerData.bgColor,
              backgroundImage: frontContent.headerData.bgImage,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <img src={frontContent.headerData.logo} width={200} alt="logo" />
              <h1
                style={{
                  color: frontContent.headerData.tituloColor,
                  fontSize: frontContent.headerData.titulofontSize,
                  position: "relative",
                  left: frontContent.headerData.positionTitulo + "%",
                  top: frontContent.headerData.positionTituloV + "px",
                  transition: "left 0.3s ease",
                }}
              >
                {frontContent.headerData.titulo}
              </h1>
              <p
                style={{
                  color: frontContent.headerData.duracaoColor,
                  fontSize: frontContent.headerData.duracaofontSize,
                  position: "relative",
                  left: frontContent.headerData.positionduracao + "%",
                  top: frontContent.headerData.positionduracaoV + "px",
                  transition: "left 0.3s ease",
                }}
              >
                {frontContent.headerData.duracao}
              </p>
            </div>
          </header>
        )}
      </div>
      <div className="cards">
        {frontContent.cards &&
          frontContent.cards.map((card, index) => (
            <div className="card" key={index}>
              <img src={card.image} alt={`Product ${index}`} />
              <p>{card.description}</p>
              <h1 style={{ color: frontContent.cardcolorData.precocor }}>
                R${card.price}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Panfletomercado;
