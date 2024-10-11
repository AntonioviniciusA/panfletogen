import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "@fontsource/roboto";
import "@fontsource/open-sans";
import "@fontsource/lobster";
const Templetemercado = () => {
  /*-------------------- HEADER-------------------------*/
  {
    /* header*/
  }
  const [bgtypeheader, setBgTypeHeader] = useState({
    value: "",
  });
  const [headerData, setHeaderData] = useState({
    bgImage: "",
    logo: "",
    bgColor: "",
    titulo: "",
    tituloColor: "",
    titulofontSize: "",
    duracao: "",
    duracaoColor: "",
    duracaofontSize: "",
    positionduracao: "",
    positionduracaoV: "",
    positionTitulo: "",
    positionTituloV: "",
    positionlogo: "",
    positionlogoV: "",
    titulofont: "",
  });
  const [positionlogoV, setPositionlogoV] = useState(0);

  const handlelogoPositionVChange = (e) => {
    setPositionlogoV(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      positionlogoV: e.target.value,
    }));
  };
  const [positionlogo, setPositionlogo] = useState(0);

  const handlelogoPositionChange = (e) => {
    setPositionlogo(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      positionlogo: e.target.value,
    }));
  };

  const [positionTituloV, setPositionTituloV] = useState(0);

  const handleTituloPositionVChange = (e) => {
    setPositionTituloV(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      positionTituloV: e.target.value,
    }));
  };
  const [positionTitulo, setPositionTitulo] = useState(45);

  const handleTituloPositionChange = (e) => {
    setPositionTitulo(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      positionTitulo: e.target.value,
    }));
  };

  const [positionduracaoV, setPositionduracaoV] = useState(24);

  const handleDuracaoPositionVChange = (e) => {
    setPositionduracaoV(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      positionduracaoV: e.target.value,
    }));
  };

  const [positionduracao, setPositionduracao] = useState(78);

  const handleDuracaoPositionChange = (e) => {
    setPositionduracao(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      positionduracao: e.target.value,
    }));
  };
  const [titulofontSize, settituloFontSize] = useState("16px");
  const handleTituloFontSizeChange = (e) => {
    settituloFontSize(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      titulofontSize: e.target.value,
    }));
  };
  const [titulofont, setTituloFont] = useState("Arial");

  const handleTituloFontChange = (e) => {
    setTituloFont(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      titulofont: e.target.value,
    }));
  };

  const [duracaofontSize, setduracaoFontSize] = useState("16px");
  const handleDuracaoFontSizeChange = (e) => {
    setduracaoFontSize(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      duracaofontSize: e.target.value,
    }));
  };
  const [duracaofont, setDuracaoFont] = useState("Arial");

  const handleDuracaoFontChange = (e) => {
    setDuracaoFont(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      duracaofont: e.target.value,
    }));
  };
  const [bgImage, setBgImage] = useState("");

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setBgImage(`url(${url})`);
    setHeaderData((prevData) => ({
      ...prevData,
      bgUrl: url,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Corrigido para usar URL.createObjectURL para arquivos
      setBgImage(`url(${fileUrl})`); // Atualiza o estado do background com a URL da imagem
      setHeaderData((prevData) => ({
        ...prevData,
        bgImage: fileUrl, // Atualiza o headerData com a URL do arquivo
        bgColor,
      }));
    }
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaderData({ ...headerData, bgImage, [name]: value });
    setHeaderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  /*-------------------- PRODUTOS -------------------------*/
  const [cards, setCards] = useState([]);
  const [cardcolorData, setCardColorData] = useState({
    //setCardColorData atualiza o estado de acordo com a novas cores selecionadas
    precocor: "#000000", //define a cor do preço como black
  });
  //alteraçao de cor do cartao
  const handleCardColorChange = (e) => {
    const { name, value } = e.target;
    setCardColorData({ ...cardcolorData, [name]: value });
  };
  //ateraçao de informaçao do card
  const handleCardChange = (index, e) => {
    const { name, value } = e.target;
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [name]: value };
    setCards(newCards); //define o novo estado do cartao
  };
  //adiciona um novo card
  const handleAddCard = () => {
    setCards([...cards, { image: "", description: "", price: "" }]); //Cria um novo array com os card existentes e define um novo card com as propriedades image, description, price vazais
  };
  // alterar cor background 'page'
  const [pageBgColor, setPageBgColor] = useState(); // cor padrão do fundo da página
  const backgroundcard = (e) => {
    const { value } = e.target;
    setPageBgColor(value); // altera a cor de fundo do "page"
  };
  //remove cards
  const handleRemoveCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1); //Utiliza o metodo Splice para remover um card em expecifico
    setCards(newCards);
  };
  /*-------------------- CONFIG DE SAVE -------------------------*/
  {
    /* SALVA O DOCUMENTO*/
  }
  const handleSavePanfleto = (e) => {
    e.preventDefault();
    saveFormData(); // Captura os dados do form antes de salvar
    localStorage.setItem(
      //Salva os dados no LocalStorage
      "frontContent",
      JSON.stringify({ headerData, cardcolorData, cards }) //Armazena as tres variaveis e e converte para JSON utilizando JSON.stringify()
    );
    alert("Panfleto salvo! Apertem em (ok) para continuar"); // Gera um aviso na tela do usuario avisando que o panfleto foi salvo :)
    navigate("/panfleto-mercado"); //Redireciona o usuario para a paguna de panfleto-mercado apos o panfleto ser salvo
    if (headerData) {
      setHeaderData(headerData);
    }
  };
  {
    /* SALVA O DOCUMENTO*/
  }
  {
    /* NAVEGA*/
  }
  const navigate = useNavigate();
  {
    /* NAVEGA*/
  }
  {
    /* SALVA HISTORICO DO USUARIO*/
  }

  // Função para salvar os dados no localStorage
  const saveFormData = () => {
    localStorage.setItem(
      "formData",
      JSON.stringify({ bgtypeheader, headerData, cards })
    );
  };

  // Carrega os dados salvos do localStorage ao montar o componente
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setBgTypeHeader(savedData.bgtypeheader);
      setHeaderData(savedData.headerData);
      setCards(savedData.cards || []);
    }
  }, []);
  {
    /* SALVA HISTORICO DO USUARIO*/
  }
  return (
    <>
      <Header />
      <div
        //fundo, container pai
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1e40af",
          gap: "5%",
          padding: "35px",
        }}
      >
        <div
          //container de configurações
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
            backgroundColor: "#bfdbfe",
          }}
        >
          <div
            style={{
              width: "90%",
              margin: "3%",
              padding: "3%",
              borderRadius: "20px",
              backgroundColor: "#93c5fd",
            }}
          >
            <form
              onSubmit={Templetemercado}
              style={{
                borderRadius: "25px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              <div>
                <div
                  //container logo
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div //div logo
                    style={{
                      width: "90%",
                      padding: "5%",
                      borderRadius: "20px",
                      backgroundColor: "#bfdbfe",
                    }}
                  >
                    <div className="">
                      <select
                        value={bgtypeheader}
                        name="bgtypeheader"
                        id="bgtypeheader"
                        onChange={(e) => {
                          setBgTypeHeader(e.target.value);
                        }}
                      >
                        <option
                          value=""
                          placeholder="Selecione um tipo de fundo"
                        >
                          Selecione um tipo de fundo
                        </option>
                        <option value="url" placeholder="https://exemplo.webp">
                          Link de uma imagem
                        </option>
                        <option value="file">Imagem</option>
                        <option value="color">Cor de Fundo</option>
                      </select>

                      {bgtypeheader === "url" && (
                        <input
                          type="text"
                          placeholder="Insira o URL da imagem"
                          onChange={handleUrlChange}
                        />
                      )}

                      {bgtypeheader === "file" && (
                        <input
                          type="file"
                          name="bgImage"
                          onChange={handleFileChange}
                        />
                      )}

                      {bgtypeheader === "color" && (
                        <input
                          type="color"
                          name="bgColor"
                          className="colorswitch"
                          value={headerData.bgColor}
                          onChange={handleHeaderChange}
                        />
                      )}
                    </div>
                    <br />

                    <input
                      type="file"
                      name="logo"
                      onChange={(e) =>
                        setHeaderData({
                          ...headerData,
                          logo: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                    />
                    <label>
                      localização horizontal da Logo:
                      <input
                        type="range"
                        id="positionlogo"
                        min="0"
                        max="100"
                        value={positionlogo}
                        onChange={handlelogoPositionChange}
                        style={{ width: "100%" }}
                      />
                    </label>
                    <label>
                      localização vertical da Logo:
                      <input
                        type="range"
                        id="positionlogoV"
                        min="0"
                        max="100"
                        value={positionlogoV}
                        onChange={handlelogoPositionVChange}
                        style={{ width: "100%" }}
                      />
                    </label>
                  </div>
                </div>
                <br />

                <div
                  //container frase
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    id="div-titulo"
                    style={{
                      width: "90%",
                      padding: "5%",
                      borderRadius: "20px",
                      backgroundColor: "#bfdbfe",
                    }}
                  >
                    <label>
                      Frase Promocional:
                      <input
                        type="text"
                        name="titulo"
                        value={headerData.titulo}
                        onChange={handleHeaderChange}
                        placeholder="Economia Garantida Toda Semana! Descubra as Ofertas Imperdíveis do Supermercado XYZ!"
                      />
                    </label>
                    <div className="estiloletra">
                      <select
                        id="titulofont"
                        value={titulofont}
                        onChange={handleTituloFontChange}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lobster">Lobster</option>
                        <option value="New Amsterdam">New Amsterdam</option>
                      </select>

                      <select
                        id="titulofontSize"
                        value={titulofontSize}
                        onChange={handleTituloFontSizeChange}
                      >
                        <option value="12px">12px</option>
                        <option value="16px">16px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                        <option value="28px">28px</option>
                        <option value="32px">32px</option>
                        <option value="36px">36px</option>
                      </select>

                      <input
                        type="color"
                        name="tituloColor"
                        className="colorswitch"
                        value={headerData.tituloColor}
                        onChange={handleHeaderChange}
                      />
                    </div>
                    <br />
                    <label>
                      localização horizontal da validade:
                      <input
                        type="range"
                        id="positionTitulo"
                        min="0"
                        max="100"
                        value={positionTitulo}
                        onChange={handleTituloPositionChange}
                        style={{ width: "100%" }}
                      />
                    </label>
                    <label>
                      localização vertical da validade:
                      <input
                        type="range"
                        id="positionTituloV"
                        min="0"
                        max="100"
                        value={positionTituloV}
                        onChange={handleTituloPositionVChange}
                        style={{ width: "100%" }}
                      />
                    </label>
                  </div>
                </div>
                <br />

                <div
                  //container validade
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      padding: "5%",
                      borderRadius: "20px",
                      backgroundColor: "#bfdbfe",
                    }}
                  >
                    <label>
                      Validade da Promoção:
                      <input
                        type="text"
                        name="duracao"
                        value={headerData.duracao}
                        onChange={handleHeaderChange}
                        placeholder="Valido do dia 99 ao dia 99 de ago"
                      />
                    </label>
                    <div className="estiloletra">
                      <select
                        id="duracaofont"
                        value={duracaofont}
                        onChange={handleDuracaoFontChange}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lobster">Lobster</option>
                        <option value="New Amsterdam">New Amsterdam</option>
                      </select>
                      <select
                        id="duracaofontSize"
                        value={duracaofontSize}
                        onChange={handleDuracaoFontSizeChange}
                      >
                        <option value="12px">12px</option>
                        <option value="16px">16px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                        <option value="28px">28px</option>
                        <option value="32px">32px</option>
                        <option value="36px">36px</option>
                      </select>

                      <input
                        type="color"
                        name="duracaoColor"
                        className="colorswitch"
                        value={headerData.duracaoColor}
                        onChange={handleHeaderChange}
                      />
                    </div>

                    <br />
                    <label>
                      localização horizontal da validade:
                      <input
                        type="range"
                        id="positionduracao"
                        min="0"
                        max="100"
                        value={positionduracao}
                        onChange={handleDuracaoPositionChange}
                        style={{ width: "100%" }}
                      />
                    </label>
                    <label>
                      localização vertical da validade:
                      <input
                        type="range"
                        id="positionduracaoV"
                        min="0"
                        max="100"
                        value={positionduracaoV}
                        onChange={handleDuracaoPositionVChange}
                        style={{ width: "100%" }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </form>
            <br />
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  width: "90%",
                  padding: "5%",
                  borderRadius: "20px",
                  backgroundColor: "#bfdbfe",
                }}
              >
                {" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                  }}
                >
                  <h3>Cards</h3>
                </div>
                <form
                  style={{
                    width: "90%",
                    padding: "5%",
                    borderRadius: "20px",
                  }}
                >
                  {" "}
                  {/* cor fundo */}
                  <label>
                    Cor de fundo:
                    <input
                      type="color"
                      name="page"
                      className="colorswitch"
                      value={pageBgColor}
                      onChange={backgroundcard}
                    />
                  </label>
                  <label>
                    Cor do preço:
                    <input
                      type="color"
                      name="precocor"
                      className="colorswitch"
                      value={cardcolorData.precocor}
                      onChange={handleCardColorChange}
                    />
                  </label>
                </form>
                {cards.map((card, index) => (
                  <form
                    key={index}
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                    }}
                  >
                    <input
                      type="file"
                      name="image"
                      onChange={(e) =>
                        handleCardChange(index, {
                          target: {
                            name: "image",
                            value: URL.createObjectURL(e.target.files[0]),
                          },
                        })
                      }
                    />
                    <input
                      type="text"
                      name="description"
                      value={card.description}
                      onChange={(e) => handleCardChange(index, e)}
                      placeholder="Descrição do Produto"
                    />
                    <label>
                      Preço
                      <input
                        type="text"
                        name="price"
                        value={card.price}
                        onChange={(e) => handleCardChange(index, e)}
                        placeholder="9,99"
                      />
                    </label>

                    <button onClick={() => handleRemoveCard(index)}>
                      Remover
                    </button>
                  </form>
                ))}
                <button onClick={handleAddCard}>Adicionar Card</button>
              </div>
            </div>
            <br />

            {/* config footer  */}
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  width: "90%",
                  padding: "5%",
                  borderRadius: "20px",
                  backgroundColor: "#bfdbfe",
                }}
              ></div>
            </div>

            {/* container botao  */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                padding: "10px",

                bgColor: "blue",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  bgColor: "blue",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    fontFamily: "inherit",
                    fontSize: "20px",
                    fill: "rgb(255, 255, 255)", // Cor do SVG
                    padding: "0.7em 1em",
                    paddingLeft: "0.9em",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "15px",
                    fontWeight: "1000",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#1e3a8a"; // Azul mais escuro no hover
                    const svg = e.target.querySelector("svg");
                    const span = e.target.querySelector("span");
                    const svgWrapper = e.target.querySelector(".svg-wrapper");
                    if (svg) {
                      svg.style.transform = "translateX(1.2em) scale(1.1)";
                      svg.style.fill = "#ffffff"; // Branco no hover
                    }
                    if (span) {
                      span.style.opacity = "0";
                    }
                    if (svgWrapper) {
                      svgWrapper.style.transform = "scale(1.25)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#3b82f6"; // Volta ao bg original
                    const svg = e.target.querySelector("svg");
                    const span = e.target.querySelector("span");
                    const svgWrapper = e.target.querySelector(".svg-wrapper");
                    if (svg) {
                      svg.style.transform = "none";
                      svg.style.fill = "#ffffff"; // Mantém branco
                    }
                    if (span) {
                      span.style.opacity = "1";
                    }
                    if (svgWrapper) {
                      svgWrapper.style.transform = "none";
                    }
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = "scale(0.95)";
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                  onClick={handleSavePanfleto}
                >
                  <div
                    className="svg-wrapper-1"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      className="svg-wrapper"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30"
                        height="30"
                        className="icon"
                        style={{
                          transition: "transform 0.3s ease-in-out",
                          fill: "#ffffff", // Branco
                        }}
                      >
                        <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"></path>
                      </svg>
                    </div>
                  </div>
                  <span
                    style={{
                      marginLeft: "0.3em",
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    Salvar e ir
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview*/}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              padding: "10px",
              borderRadius: "20px 20px 0px 0px",
              backgroundColor: "#bfdbfe",
            }}
          >
            <h1>Preview</h1>
          </div>

          <div id="front-page" className="page">
            {headerData && (
              <header
                className=" "
                style={{
                  backgroundColor: headerData.bgColor,
                  backgroundImage: headerData.bgImage,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div>
                  <img
                    src={headerData.logo}
                    style={{
                      position: "relative",
                      left: headerData.positionlogo + "%",
                      top: headerData.positionlogoV + "px",
                    }}
                    width={100} //200
                    alt="logo"
                  />
                  <h1
                    style={{
                      color: headerData.tituloColor,
                      fontFamily: headerData.titulofont,
                      fontSize: headerData.titulofontSize,
                      position: "relative",
                      left: headerData.positionTitulo + "%",
                      top: headerData.positionTituloV + "px",
                      transition: "left 0.3s ease",
                    }}
                  >
                    {headerData.titulo}
                  </h1>
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
                </div>
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
                className="page "
                style={{ backgroundColor: pageBgColor }} // Aplica a cor de fundo
              >
                <div className="cards">
                  {cards &&
                    cards.map((card, index) => (
                      <div className="card" key={index}>
                        <img src={card.image} alt={`Product ${index}`} />
                        <p>{card.description}</p>
                        <h1 style={{ color: cardcolorData.precocor }}>
                          R${card.price}
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <Footer />
    </>
  );
};

export default Templetemercado;
