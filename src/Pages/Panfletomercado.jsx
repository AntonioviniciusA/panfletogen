import { useEffect, useState } from "react";
import "@fontsource/roboto";
import "@fontsource/open-sans";
import "@fontsource/lobster";

const Panfletomercado = () => {
  const [frontContent, setFrontContent] = useState({});

  useEffect(() => {
    const savedFrontContent = JSON.parse(localStorage.getItem("frontContent"));

    if (savedFrontContent) {
      setFrontContent(savedFrontContent);
    }
  }, []);
  return (
    <div className="container">
      <h1>Vizualização</h1>
      <div id="front-page" className="page">
        {headerData && (
          <header
            className=" "
            style={{
              backgroundColor: headerData.bgColor,
              backgroundImage: headerData.bgImage,
              height: `${headerData.headerHeight}px`, //altura definida pelo usuaruio no input
              position: "relative",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Rnd
              default={{
                x: headerData.positionlogo, // Posição inicial X da logo
                y: headerData.positionlogoV, // Posição inicial Y da logo
                width: 100,
                height: "auto",
              }}
              minWidth={50}
              minHeight={50}
              bounds="parent"
              onDragStop={(e, d) => {
                setHeaderData((prevData) => ({
                  ...prevData,
                  positionlogo: d.x, // Atualiza a posição X no estado
                  positionlogoV: d.y, // Atualiza a posição Y no estado
                }));
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setHeaderData((prevData) => ({
                  ...prevData,
                  positionlogo: position.x, // Atualiza a posição X no estado
                  positionlogoV: position.y, // Atualiza a posição Y no estado
                }));
              }}
            >
              <img src={headerData.logo} alt="logo" />
            </Rnd>

            <Rnd
              default={{
                x: headerData.positionTitulo, // Posição inicial X do título
                y: headerData.positionTituloV, // Posição inicial Y do título
                height: "auto",
              }}
              minWidth={50}
              minHeight={0}
              bounds="parent" // Garante que o título não seja arrastado para fora do elemento pai
              enableResizing={false} // Desativa o redimensionamento
              style={{ cursor: "move" }} // Força o cursor a ser "move"
              onDragStop={(e, d) => {
                // Atualiza a posição do título no estado quando o arrasto parar
                setHeaderData((prevData) => ({
                  ...prevData,
                  positionTitulo: d.x, // Atualiza a posição X do título
                  positionTituloV: d.y, // Atualiza a posição Y do título
                }));
              }}
            >
              <h1
                style={{
                  color: headerData.tituloColor,
                  fontFamily: headerData.titulofont,
                  fontSize: headerData.titulofontSize,
                  position: "relative",
                  transition: "left 0.3s ease",
                }}
              >
                {headerData.titulo}
              </h1>
            </Rnd>

            <p
              style={{
                color: headerData.duracaoColor,
                fontFamily: headerData.duracaofont,
                fontSize: headerData.duracaofontSize,
                position: "relative",
                left: headerData.positionduracao + "%",
                top: headerData.positionduracaoV + "px",
                transition: "left 0.3s ease",
              }}
            >
              {headerData.duracao}
            </p>
          </header>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="pageCards"
            style={{ backgroundColor: pageBgColorData }} // Aplica a cor de fundo
          >
            <div className="cards">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => openEditModal(index)}
                  style={{
                    border:
                      selectedCardIndex === index
                        ? "3px solid blue" // add a cor
                        : "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  <img src={card.image} alt={`Product ${index}`} />
                  <p>{card.description}</p>
                  <h1 style={{ color: cardcolorData.precocor || "white" }}>
                    R${card.price}
                  </h1>
                </div>
              ))}
            </div>
          </div>
          {editingCardIndex !== null && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "30%",
                width: "30%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#bfdbfe",
                padding: "20px",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                borderRadius: "20px",
                zIndex: 5000,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h3>Editar Card</h3>
                <form
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                  }}
                >
                  <input
                    type="file"
                    name="image"
                    onChange={(e) =>
                      handleCardChange(editingCardIndex, {
                        target: {
                          name: "image",
                          value: URL.createObjectURL(e.target.files[0]),
                        },
                      })
                    }
                  />
                  <label>
                    Descrição do Produto:
                    <input
                      type="text"
                      name="description"
                      value={cards[editingCardIndex].description}
                      onChange={(e) => handleCardChange(editingCardIndex, e)}
                      placeholder="Descrição do Produto"
                    />
                  </label>
                  <label>
                    Preço:
                    <input
                      type="text"
                      name="price"
                      value={cards[editingCardIndex].price}
                      onChange={(e) => handleCardChange(editingCardIndex, e)}
                      placeholder="9,99"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveCard(editingCardIndex)}
                  >
                    Remover
                  </button>
                </form>
                <button
                  onClick={closeEditModal}
                  style={{
                    backgroundColor: "red",
                    padding: "5px",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <footer
          style={{
            position: "relative",
            height: `${footerData.footerHeight}px`, //altura definida pelo usuaruio no input
            backgroundColor: footerBgColor, // Aplica a cor de fundo ao "footer"
            border: "1px solid black",
          }}
        >
          {footerData.logo && (
            <Rnd
              default={{
                x: footerData.positionlogofH,
                y: footerData.positionlogofV,
                width: 100,
                height: "auto",
              }}
              minWidth={50}
              minHeight={50}
              bounds="parent"
            >
              <img src={footerData.logo} alt="logo-footer" />
            </Rnd>
          )}
          {footerData.image1f && (
            <Rnd
              default={{
                x: footerData.positionimg1fH,
                y: footerData.positionimg1fV,
                width: 100,
                height: "auto",
              }}
              minWidth={50}
              minHeight={50}
              bounds="parent"
            >
              <img src={footerData.image1f} alt="image-footer-1" />
            </Rnd>
          )}
          {footerData.image2f && (
            <Rnd
              default={{
                x: footerData.positionimg2fH,
                y: footerData.positionimg2fV,
                width: 100,
                height: "auto",
              }}
              minWidth={50}
              minHeight={50}
              bounds="parent"
            >
              <img src={footerData.image2f} alt="image-footer-2" />
            </Rnd>
          )}
          {footerData.image3f && (
            <Rnd
              default={{
                x: footerData.positionimg3fH,
                y: footerData.positionimg3fV,
                width: 100,
                height: "auto",
              }}
              minWidth={50}
              minHeight={50}
              bounds="parent"
            >
              <img src={footerData.image3f} alt="image-footer-3" />
            </Rnd>
          )}
          {footerData.image4f && (
            <Rnd
              default={{
                x: footerData.positionimg4fH,
                y: footerData.positionimg4fV,
                width: 100,
                height: "auto",
              }}
              minWidth={50}
              minHeight={50}
              bounds="parent"
            >
              <img src={footerData.image4f} alt="image-footer-4" />
            </Rnd>
          )}

          {footerData.tel && (
            <Rnd
              default={{
                x: footerData.positiontelfH,
                y: footerData.positiontelfV,
                height: "auto",
              }}
              minWidth={160}
              maxHeight={25}
              bounds="parent"
              enableResizing={false}
              style={{ cursor: "move" }}
            >
              <p
                style={{
                  position: "relative",
                  fontFamily: footerData?.telfont || "Arial",
                  fontSize: footerData?.telfontSize || "16px",
                  width: "auto",
                  color: footerData?.telColor || "black",
                }}
              >
                {footerData.tel}
              </p>
            </Rnd>
          )}

          <Rnd
            default={{
              x: footerData.positionsocial1fH,
              y: footerData.positionsocial1fV,
              height: "auto",
            }}
            bounds="parent"
            enableResizing={false}
            style={{ cursor: "move" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={getSocialIcon()}
                style={{
                  fontSize: "30px",
                  marginRight: "10px",
                  color: "gray",
                }}
              />
              <p style={{ fontSize: "16px", margin: 0, color: "black" }}>
                {footerData.socialText1}
              </p>
            </div>
          </Rnd>

          <Rnd
            default={{
              x: footerData.positionsocial2fH,
              y: footerData.positionsocial2fV,
              height: "auto",
            }}
            bounds="parent"
            enableResizing={false}
            style={{ cursor: "move" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={getSocialIcon2()}
                style={{
                  fontSize: "30px",
                  marginRight: "10px",
                  color: "gray",
                }}
              />
              <p style={{ fontSize: "16px", margin: 0, color: "black" }}>
                {footerData.socialText2}
              </p>
            </div>
          </Rnd>
        </footer>
        {/*  */}
      </div>
    </div>
  );
};

export default Panfletomercado;
