import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../style.css";

const CardsPage = () => {
  const [frontContent, setFrontContent] = useState({});
  const [backContent, setBackContent] = useState({});
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    const savedFrontContent = JSON.parse(localStorage.getItem("frontContent"));
    const savedBackContent = JSON.parse(localStorage.getItem("backContent"));
    if (savedFrontContent) {
      setFrontContent(savedFrontContent);
    }
    if (savedBackContent) {
      setBackContent(savedBackContent);
    }
  }, []);

  const handleDownload = (elementId, filename) => {
    html2canvas(document.querySelector(".container")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 size width in mm
      const pageHeight = 295; // A4 size height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${filename}.pdf`);
    });
  };

  return (
    <div className="container">
      <h1>Visualização do Panfleto</h1>
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
      {showFront && (
        <div id="front-page" className="page">
          {frontContent.headerData && (
            <header
              style={{
                backgroundColor: frontContent.headerData.bgColor,
                color: frontContent.headerData.textColor,
              }}
            >
              {frontContent.headerData.image ? (
                <img
                  src={frontContent.headerData.image}
                  alt="Header"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  {frontContent.headerData.logo && (
                    <img
                      src={frontContent.headerData.logo}
                      alt="Logo"
                      width={500}
                    />
                  )}
                  <h1>{frontContent.headerData.description}</h1>
                  <p>{frontContent.headerData.duration}</p>
                </div>
              )}
            </header>
          )}
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
          {frontContent.footerData && (
            <footer
              style={{ backgroundColor: frontContent.footerData.bgColor }}
            >
              <p>{frontContent.footerData.text}</p>
              <p>{frontContent.footerData.address}</p>
              <p>{frontContent.footerData.hours}</p>
            </footer>
          )}
          <button onClick={() => handleDownload("front-page", "frente")}>
            Baixar Frente
          </button>
        </div>
      )}
      {!showFront && (
        <div id="back-page" className="page">
          {backContent.headerData && (
            <header
              style={{
                backgroundColor: backContent.headerData.bgColor,
                color: backContent.headerData.textColor,
              }}
            >
              {backContent.headerData.image ? (
                <img
                  src={backContent.headerData.image}
                  alt="Header"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  {backContent.headerData.logo && (
                    <img
                      src={backContent.headerData.logo}
                      alt="Logo"
                      width={500}
                    />
                  )}
                  <h1>{backContent.headerData.description}</h1>
                  <p>{backContent.headerData.duration}</p>
                </div>
              )}
            </header>
          )}
          <div className="cards">
            {backContent.cards &&
              backContent.cards.map((card, index) => (
                <div className="card" key={index}>
                  <img src={card.image} alt={`Product ${index}`} />
                  <p>{card.description}</p>
                  <h1 style={{ color: backContent.cardcolorData.precocor }}>
                    R${card.price}
                  </h1>
                </div>
              ))}
          </div>
          {backContent.footerData && (
            <footer style={{ backgroundColor: backContent.footerData.bgColor }}>
              <p>{backContent.footerData.text}</p>
              <div>
                {backContent.footerData.paymentMethods &&
                  backContent.footerData.paymentMethods.map((method, index) => (
                    <img
                      key={index}
                      src={method}
                      alt={`Payment ${index}`}
                      style={{ width: "50px" }}
                    />
                  ))}
              </div>
            </footer>
          )}
          <button onClick={() => handleDownload("back-page", "verso")}>
            Baixar Verso
          </button>
        </div>
      )}
    </div>
  );
};

export default CardsPage;
