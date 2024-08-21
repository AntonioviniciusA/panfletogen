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

  const [isDragging, setIsDragging] = useState(null);
  const [positions, setPositions] = useState({
    box1: { x: 100, y: 100 },
  });

  const handleMouseDown = (event, box) => {
    setIsDragging(box);
    event.target.style.cursor = "grabbing";
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const newX = event.clientX - 50;
      const newY = event.clientY - 50;

      setPositions((prevPositions) => ({
        ...prevPositions,
        [isDragging]: { x: newX, y: newY },
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };
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
            <div
              style={{ position: "relative" }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <img
                src={frontContent.headerData.logo}
                width={200}
                alt="logo"
                style={{
                  position: "absolute",
                  top: `${positions.box1.y}px`,
                  left: `${positions.box1.x}px`,
                  cursor: "grab",
                }}
                onMouseDown={(event) => handleMouseDown(event, "box1")}
              />
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
