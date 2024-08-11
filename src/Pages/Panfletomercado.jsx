import { useEffect, useState } from "react";

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
              <h1>{frontContent.headerData.titulo}</h1>
              <p>{frontContent.headerData.duracao}</p>
            </div>
          </header>
        )}
      </div>
    </div>
  );
};

export default Panfletomercado;
