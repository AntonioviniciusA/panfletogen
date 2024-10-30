import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Rnd } from "react-rnd";
// import { SketchPicker } from "react-color";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "@fontsource/roboto";
import "@fontsource/open-sans";
import "@fontsource/lobster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Templetemercado = () => {
  /*-------------------- HEADER-------------------------*/
  {
    /* header*/
  }

  const [bgtypeheader, setBgTypeHeader] = useState({
    value: "",
  });
  const [bgtypeFooter, setBgTypeFooter] = useState({
    value: "",
  });
  const [headerData, setHeaderData] = useState({
    bgImage: "",
    logo: "",
    bgColor: "",
    titulo: "",
    tituloColor: "",
    duracao: "",
    duracaoColor: "",
    duracaofontSize: "",
    positionduracao: "",
    positionduracaoV: "",
    positionTitulo: "",
    positionTituloV: "",
    positionlogo: 0,
    positionlogoV: 0,
    logoHeight: 0,
    logoWidth: 0,
    titulofont: "",
    titulofontSize: "",

    headerHeight: 150,
  });

  const [titulo, setTitulo] = useState("");
  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      titulo: e.target.value,
    }));
  };

  const [titulofontSize, setTituloFontSize] = useState("16px");
  const handleTituloFontSizeChange = (e) => {
    setTituloFontSize(e.target.value);
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

  const [telfontSize, setTelFontSize] = useState("16px");
  const [telfont, setTelFont] = useState("Arial");

  const handleTelFontSizeChange = (e) => {
    const newSize = e.target.value;
    setTelFontSize(newSize);
    setFooterData((prevData) => ({
      ...prevData,
      telfontSize: newSize,
    }));
  };

  const handleTelFontChange = (e) => {
    const newFont = e.target.value;
    setTelFont(newFont);
    setFooterData((prevData) => ({
      ...prevData,
      telfont: newFont,
    }));
  };

  const handleRightChange = (e) => {
    const newRight = e.target.value;
    setFooterData((prevData) => ({
      ...prevData,
      right: newRight,
    }));
  };

  const handleRightFontSizeChange = (e) => {
    const newSize = e.target.value;
    setFooterData((prevData) => ({
      ...prevData,
      rightFontSize: newSize,
    }));
  };

  const handleRightFontChange = (e) => {
    const newFont = e.target.value;
    setFooterData((prevData) => ({
      ...prevData,
      rightFont: newFont,
    }));
  };

  const handleRightColorChange = (e) => {
    const newColor = e.target.value;
    setFooterData((prevData) => ({
      ...prevData,
      rightColor: newColor,
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
  const [bgColor, setBgColor] = useState("transparent");
  const handleClearChange = (e) => {
    setBgTypeHeader(e.target.value);
    setBgImage(``);
    setBgColor(``);
    setHeaderData((prevData) => ({
      ...prevData,
      bgImage: ``,
      bgColor: ``,
    }));
  };
  const handleUrlChange = (e) => {
    const url = e.clipboardData.getData("text"); // Captura a URL colada como texto
    setBgImage(`url(${url})`);
    setHeaderData((prevData) => ({
      ...prevData,
      bgImage: `url(${url})`,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setBgImage(`url(${fileUrl})`);
      setHeaderData((prevData) => ({
        ...prevData,
        bgImage: `url(${fileUrl})`,
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

  // Estado dos cards

  // Estado para a cor de fundo do preço
  const [cardcolorData, setCardColorData] = useState({
    precocor: "#000000", // define a cor do preço como preto
  });
  const [pageBgColorData, setPageBgColorData] = useState("#ffffff");
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [editingCardIndexb, setEditingCardIndexb] = useState(null);
  const [selectedCardIndexb, setSelectedCardIndexb] = useState(null);
  // Altera a cor do preço do card
  const handleCardColorChange = (e) => {
    const { name, value } = e.target;
    setCardColorData({ ...cardcolorData, [name]: value });
  };

  // Altera as informações do card
  const handleCardChange = (index, e) => {
    const { name, value } = e.target;
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [name]: value };
    setCards(newCards); // Define o novo estado do card
  };
  const handleCardChangeb = (index, e) => {
    const { name, value } = e.target;
    const newCards = [...cardsExtension];
    newCards[index] = { ...newCards[index], [name]: value };
    setCardsExtension(newCards); // Define o novo estado do card
  };
  const [cards, setCards] = useState([]);
  const [cardsExtension, setCardsExtension] = useState([]);
  let maxCards = 16; //100
  let maxCardsExtension = 16;
  //
  //
  //
  // Adiciona um novo card
  const handleAddCard = () => {
    if (cards.length < maxCards) {
      setCards([
        ...cards,
        `Card ${cards.length + 1}`,
        { image: "", description: "", price: "" },
      ]);
    } else if (cardsExtension.length < maxCardsExtension) {
      // alert("Você atingiu o limite de cards na primeira pagina.");
      setCardsExtension([
        ...cardsExtension,
        `CardExtension ${cardsExtension.length + 10}`,
        { image: "", description: "", price: "" },
      ]);
    } else {
      alert("Você atingiu o limite de cards em ambas paginas.");
    }
  };
  //add o padding nos cards
  const isMaxCardsReached = cards.length >= maxCards;
  //

  //cria uma margem em volta do objeto

  // Altera a cor de fundo da página
  const backgroundcard = (e) => {
    const { value } = e.target;
    setPageBgColorData(value); // Altera a cor de fundo da página
  };

  // Remove um card
  const handleRemoveCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1); // Remove o card específico
    setCards(newCards);
    setEditingCardIndex(null); // Fecha o modal se o card editado for removido
  };
  const handleRemoveCardb = (index) => {
    const newCards = [...cardsExtension];
    newCards.splice(index, 1); // Remove o card específico
    setCardsExtension(newCards);
    setEditingCardIndexb(null); // Fecha o modal se o card editado for removido
  };
  // Abre o modal de edição do card
  const openEditModal = (index) => {
    setEditingCardIndex(null); // Fecha o modal
    setSelectedCardIndex(null);
    setEditingCardIndexb(null); // Fecha o modal
    setSelectedCardIndexb(null);
    setEditingCardIndex(index);
    setSelectedCardIndex(index);
  };
  const openEditModalb = (index) => {
    setEditingCardIndex(null); // Fecha o modal
    setSelectedCardIndex(null);
    setEditingCardIndexb(null); // Fecha o modal
    setSelectedCardIndexb(null);
    setEditingCardIndexb(index);
    setSelectedCardIndexb(index);
  };
  // Fecha o modal de edição do card
  const closeEditModalb = () => {
    setEditingCardIndexb(null); // Fecha o modal
    setSelectedCardIndexb(null);
  };
  // Fecha o modal de edição do card
  const closeEditModal = () => {
    setEditingCardIndex(null); // Fecha o modal
    setSelectedCardIndex(null);
  };
  const f1 = document.getElementById("f1");
  const f2 = document.getElementById("f2");
  if (f1 && f2) {
    if (cards.length === maxCards) {
      f2.style.display = "flex";
      f1.style.display = "none";
      f1.style.height = "0";
    } else {
      f2.style.display = "none";
      f1.style.display = "flex";
    }
  }
  /*-------------------- CONFIG DO FOOTERS -------------------------*/
  const [footerData, setFooterData] = useState({
    bgImageF: "",
    bgColorF: "",
    logo: "",
    tel: "",
    image1f: "",
    image2f: "",
    image3f: "",
    image4f: "",
    logoWidth: "",
    logoHeight: "",
    right: "",
    positionRightH: 10,
    positionRightV: 0,
    rightFont: "Arial",
    rightFontSize: "16px",
    rightColor: "#000000",
    positionlogofH: 0,
    positionlogofV: 0,
    positionimg1fH: 0,
    positionimg1fV: 0,
    positionimg2fH: 0,
    positionimg2fV: 0,
    positionimg3fH: 0,
    positionimg3fV: 0,
    positionimg4fH: 0,
    positionimg4fV: 0,
    positiontelfH: 10,
    positiontelfV: 0,
    widthimg1: 0,
    heightimg1: 0,
    widthimg2: 0,
    heightimg2: 0,
    widthimg3: 0,
    heightimg3: 0,
    widthimg4: 0,
    heightimg4: 0,
    logotel: "whatsapp",
    telfont: "Arial",
    telfontSize: "16px",
    emailFfont: "",
    emailFfontSize: "",
    positionEmailFH: 10,
    positionEmailFV: 20,
    addressFfont: "",
    addressFfontSize: "",
    positionAddressFH: "",
    positionAddressFV: "",
    positionsocial1fH: 650,
    positionsocial1fV: 100,
    social1Ffont: "",
    social1FfontSize: "",
    logoColor: "#000000",
    textColor: "#000000",
    socialIcon: "facebook",
    userInput: "",
    positionsocial2fH: 650,
    positionsocial2fV: 150,
    social2Ffont: "",
    social2FfontSize: "",
    logoColor2: "#000000",
    textColor2: "#000000",
    socialIcon2: "instagram",
    userInput2: "",
    footerHeight: 250, // define a altura padrão do footer
  });
  const [bgImageF, setBgImageF] = useState("");
  const [bgColorF, setBgColorF] = useState("transparent");
  const handleClearChangeF = (e) => {
    setBgTypeFooter(e.target.value);
    setBgImageF(``);
    setBgColorF(``);
    setFooterData((prevData) => ({
      ...prevData,
      bgImageF: ``,
      bgColorF: ``,
    }));
  };
  const handleUrlChangeF = (e) => {
    const url = e.clipboardData.getData("text"); // Captura a URL colada como texto
    setBgImageF(`url(${url})`);
    setFooterData((prevData) => ({
      ...prevData,
      bgImageF: `url(${url})`,
    }));
  };

  const handleFileChangeF = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setBgImageF(`url(${fileUrl})`);
      setFooterData((prevData) => ({
        ...prevData,
        bgImageF: `url(${fileUrl})`,
      }));
    }
  };

  const handleFooterChange = (e) => {
    const { name, value } = e.target;
    setFooterData({ ...footerData, bgImageF, [name]: value });
    setFooterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //troca de cores textos do footer
  const logoTelWtCheckbox = document.getElementById("logotelwt");
  const logoTelstyle = document.getElementById("logotel");

  if (logoTelWtCheckbox && logoTelWtCheckbox.checked) {
    console.log("O checkbox está marcado.");
  } else {
    console.log("O checkbox não está marcado.");
  }
  //troca de cor tel

  const [telColor, setTelColor] = useState("#000000");
  const handletelColorChange = (e) => {
    const newColor = e.target.value;
    setTelColor(newColor); // Atualiza a cor no estado local
    setFooterData((prevData) => ({
      ...prevData,
      telColor: newColor, // Atualiza a cor no footerData
    }));
  };

  //input alterar posicao na horinzontal da logo do footer

  const handleTelChange = (e) => {
    const { value } = e.target;
    setFooterData((prevData) => ({
      ...prevData,
      tel: value,
    }));
  };
  //

  const handleFooterDataChange = (key, value) => {
    setFooterData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Função para atualizar o ícone do primeiro social
  const handleIconChange = (event) => {
    setFooterData((prevData) => ({
      ...prevData,
      socialIcon: event.target.value,
    }));
  };

  // Função para atualizar o texto do primeiro social
  const handleUserInputChange = (event) => {
    setFooterData((prevData) => ({
      ...prevData,
      userInput: event.target.value,
    }));
  };

  // Similarmente, para o segundo ícone
  const handleLogoColor2Change = (event) => {
    setFooterData((prevData) => ({
      ...prevData,
      logoColor2: event.target.value,
    }));
  };

  const handleTextColor2Change = (event) => {
    setFooterData((prevData) => ({
      ...prevData,
      textColor2: event.target.value,
    }));
  };

  const handleIcon2Change = (event) => {
    setFooterData((prevData) => ({
      ...prevData,
      socialIcon2: event.target.value,
    }));
  };

  const handleUserInput2Change = (event) => {
    setFooterData((prevData) => ({
      ...prevData,
      userInput2: event.target.value,
    }));
  };

  // Funções para selecionar o ícone correto
  const getSocialIcon = (icon) => {
    switch (icon) {
      case "facebook":
        return faFacebook;
      case "twitter":
        return faTwitter;
      case "instagram":
        return faInstagram;
      case "whatsapp":
        return faWhatsapp;
      default:
        return null;
    }
  };

  console.log(`O número máximo de cards é: ${maxCards}`);
  /*-------------------- CONFIG DE SAVE -------------------------*/
  const [data, setData] = useState(null);
  {
    /* SALVA O DOCUMENTO*/
  }
  const handleSavePanfleto = (e) => {
    e.preventDefault();
    saveFormData(); // Captura os dados do form antes de salvar
    localStorage.setItem(
      //Salva os dados no LocalStorage
      "appData",
      JSON.stringify({
        //Armazena as variaveis e e converte para JSON utilizando JSON.stringify()
        bgtypeheader,
        bgtypeFooter,
        headerData,
        cards,
        cardsExtension,
        pageBgColorData,
        footerData,
        cardcolorData: {
          precocor: cardcolorData.precocor || "#000000", // Garante que há um valor padrão
        },
      })
    );
    alert("Panfleto salvo! Apertem em (ok) para continuar"); // Gera um aviso na tela do usuario avisando que o panfleto foi salvo :)
    if (headerData) {
      setHeaderData(headerData);
    }
    if (cards) {
      setCards(cards);
    }
    if (footerData) {
      setFooterData(footerData);
    }
    if (cardsExtension) {
      setCardsExtension(cardsExtension);
    }
    if (cardcolorData) {
      setCardColorData(cardcolorData);
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
      JSON.stringify({
        bgtypeheader,
        bgtypeFooter,
        headerData,
        cards,
        cardsExtension,
        pageBgColorData,
        footerData,
        cardcolorData,
      })
    );
  };
  function clear() {
    localStorage.removeItem("formData");
    localStorage.removeItem("appData");
    console.log("LocalStorage limpo!");
  }
  // Carrega os dados salvos do localStorage ao montar o componente
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("appData"));
    if (savedData) {
      setBgTypeHeader(savedData.bgtypeheader || "defaultHeader");
      setBgTypeHeader(savedData.bgtypeFooter || "defaultFooter");
      setHeaderData(savedData.headerData);
      setPageBgColorData(savedData.pageBgColorData);
      setFooterData(savedData.footerData || "defaultFooter");
      setCards(savedData.cards || []);
      setCardsExtension(savedData.cardsExtension || []);
      setCardColorData(savedData.cardcolorData || { precocor: "#000000" });
    }
  }, []);

  const contentRefs = [useRef(null), useRef(null)]; // Array de refs, uma para cada div

  const generatePdf = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const currentDate = new Date().toLocaleDateString("pt-BR");

    for (let i = 0; i < contentRefs.length; i++) {
      const canvas = await html2canvas(contentRefs[i].current, {
        scale: 4, // Ajuste para uma qualidade mais alta; valores entre 2 e 4 são comuns
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (i > 0) pdf.addPage(); // Adiciona nova página para cada div
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    }

    pdf.save(`Panfleto_${currentDate}.pdf`);
  };
  return (
    <>
      <Header />
      <div
        //fundo, container pai
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "#1e40af",
          gap: "30px",
          padding: "35px",
        }}
      >
        <div
          className="container-config"
          //container de configurações
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              // margin: "3%",
              padding: "3%",
              borderRadius: "25px",
              backgroundColor: "#93c5fd",
            }}
          >
            {/* //ssssss */}
            <div className="sub-container-config">
              <button onClick={clear} className="btn">
                Limpar Local Storage
              </button>
              <div>
                <p>Escolha a altura do Cabeçalho </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                }}
              >
                <button
                  onClick={() =>
                    setHeaderData((prevData) => ({
                      ...prevData,
                      headerHeight: 150,
                    }))
                  }
                  style={{
                    backgroundColor: "#007BFF", // Cor de fundo
                    color: "#FFFFFF", // Cor do texto
                    border: "none", // Sem borda
                    borderRadius: "5px", // Cantos arredondados
                    padding: "5px", // Espaçamento interno
                    fontSize: "14px", // Tamanho da fonte
                    cursor: "pointer", // Cursor de mão ao passar o mouse
                    transition: "background-color 0.3s", // Transição suave
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                  } // Cor ao passar o mouse
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#007BFF")
                  } // Cor ao sair
                >
                  150px
                </button>
                <button
                  onClick={() =>
                    setHeaderData((prevData) => ({
                      ...prevData,
                      headerHeight: 200,
                    }))
                  }
                  style={{
                    backgroundColor: "#007BFF", // Cor de fundo
                    color: "#FFFFFF", // Cor do texto
                    border: "none", // Sem borda
                    borderRadius: "5px", // Cantos arredondados
                    padding: "5px", // Espaçamento interno
                    fontSize: "14px", // Tamanho da fonte
                    cursor: "pointer", // Cursor de mão ao passar o mouse
                    transition: "background-color 0.3s", // Transição suave
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                  } // Cor ao passar o mouse
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#007BFF")
                  } // Cor ao sair
                >
                  200px
                </button>
              </div>
            </div>
            {/* ss */}
            <br />
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
                  <div className="sub-container-config">
                    <div className="">
                      <select
                        value={bgtypeheader}
                        name="bgtypeheader"
                        id="bgtypeheader"
                        onChange={handleClearChange}
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
                      <br />

                      {bgtypeheader === "url" && (
                        <input
                          type="text"
                          placeholder="Insira o URL da imagem"
                          onPaste={handleUrlChange}
                        />
                      )}

                      {bgtypeheader === "file" && (
                        <span class="tooltiptext">
                          <label className="custom-file-upload">
                            <input
                              type="file"
                              name="bgImage"
                              onChange={handleFileChange}
                            />
                            <span>+</span> {/* Logo ou ícone */}
                          </label>
                          Fundo Header
                        </span>
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
                    <span class="tooltiptext">
                      <label className="custom-file-upload">
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
                        <span>+</span> {/* Logo ou ícone */}
                      </label>
                      LOGO
                    </span>
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
                      width: "100%",
                      padding: "4%",
                      borderRadius: "20px",
                      backgroundColor: "#bfdbfe",
                    }}
                  >
                    <label>
                      <p> Frase Promocional:</p>
                      <input
                        style={
                          {
                            // maxWidth: "300px",
                          }
                        }
                        type="text"
                        name="titulo"
                        value={headerData.titulo}
                        onChange={handleTituloChange}
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
                        <option value="40px">40px</option>
                        <option value="42px">42px</option>
                        <option value="44px">44px</option>
                        <option value="48px">48px</option>
                        <option value="52px">52px</option>
                        <option value="56px">56px</option>
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
                      width: "100%",
                      padding: "4%",
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
              <div className="sub-container-config">
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
                    width: "100%",
                    padding: "4%",
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
                      value={pageBgColorData}
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
              <div className="sub-container-config">
                <div>
                  <p>Escolha a altura do footer </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <button
                    onClick={() =>
                      setFooterData((prevData) => ({
                        ...prevData,
                        footerHeight: 150,
                      }))
                    }
                    style={{
                      backgroundColor: "#007BFF", // Cor de fundo
                      color: "#FFFFFF", // Cor do texto
                      border: "none", // Sem borda
                      borderRadius: "5px", // Cantos arredondados
                      padding: "5px", // Espaçamento interno
                      fontSize: "14px", // Tamanho da fonte
                      cursor: "pointer", // Cursor de mão ao passar o mouse
                      transition: "background-color 0.3s", // Transição suave
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0056b3")
                    } // Cor ao passar o mouse
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#007BFF")
                    } // Cor ao sair
                  >
                    150px
                  </button>
                  <button
                    onClick={() =>
                      setFooterData((prevData) => ({
                        ...prevData,
                        footerHeight: 200,
                      }))
                    }
                    style={{
                      backgroundColor: "#007BFF", // Cor de fundo
                      color: "#FFFFFF", // Cor do texto
                      border: "none", // Sem borda
                      borderRadius: "5px", // Cantos arredondados
                      padding: "5px", // Espaçamento interno
                      fontSize: "14px", // Tamanho da fonte
                      cursor: "pointer", // Cursor de mão ao passar o mouse
                      transition: "background-color 0.3s", // Transição suave
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0056b3")
                    } // Cor ao passar o mouse
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#007BFF")
                    } // Cor ao sair
                  >
                    200px
                  </button>
                  <button
                    onClick={() =>
                      setFooterData((prevData) => ({
                        ...prevData,
                        footerHeight: 250,
                      }))
                    }
                    style={{
                      backgroundColor: "#007BFF", // Cor de fundo
                      color: "#FFFFFF", // Cor do texto
                      border: "none", // Sem borda
                      borderRadius: "5px", // Cantos arredondados
                      padding: "5px", // Espaçamento interno
                      fontSize: "14px", // Tamanho da fonte
                      cursor: "pointer", // Cursor de mão ao passar o mouse
                      transition: "background-color 0.3s", // Transição suave
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0056b3")
                    } // Cor ao passar o mouse
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#007BFF")
                    } // Cor ao sair
                  >
                    250px
                  </button>
                </div>
              </div>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <div className="sub-container-config">
                <h2>Adicione uma imagem:</h2>
                <div className="container-filesF">
                  <div class="tooltip">
                    <input
                      type="file"
                      name="logo"
                      id="file-upload-logoF"
                      onChange={(e) =>
                        setFooterData({
                          ...footerData,
                          logo: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                    />
                    <span class="tooltiptext">Logo</span>
                    <label
                      htmlFor="file-upload-logoF"
                      className="custom-file-upload"
                    >
                      <span>+</span> {/* Logo ou ícone */}
                    </label>
                  </div>
                  <div class="tooltip">
                    <input
                      type="file"
                      name="image1f"
                      id="file-upload-img-one"
                      onChange={(e) =>
                        setFooterData({
                          ...footerData,
                          image1f: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                    />
                    <span class="tooltiptext">Imagem 1</span>
                    <label
                      htmlFor="file-upload-img-one"
                      className="custom-file-upload"
                    >
                      <span>+</span> {/* Logo ou ícone */}
                    </label>
                  </div>
                  <div class="tooltip">
                    <input
                      type="file"
                      name="image2f"
                      id="file-upload-img-two"
                      onChange={(e) =>
                        setFooterData({
                          ...footerData,
                          image2f: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                    />
                    <span class="tooltiptext">Imagem 2</span>

                    <label
                      htmlFor="file-upload-img-two"
                      className="custom-file-upload"
                    >
                      <span>+</span> {/* Logo ou ícone */}
                    </label>
                  </div>
                  <div class="tooltip">
                    <input
                      type="file"
                      name="image3f"
                      id="file-upload-img-three"
                      onChange={(e) =>
                        setFooterData({
                          ...footerData,
                          image3f: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                    />
                    <span class="tooltiptext">Imagem 3</span>

                    <label
                      htmlFor="file-upload-img-three"
                      className="custom-file-upload"
                    >
                      <span>+</span> {/* Logo ou ícone */}
                    </label>
                  </div>
                  <div class="tooltip">
                    <input
                      type="file"
                      name="image4f"
                      id="file-upload-imgifour"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setFooterData({
                          ...footerData,
                          image4f: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                    />
                    <span class="tooltiptext">Imagem 4</span>

                    <label
                      htmlFor="file-upload-imgifour"
                      className="custom-file-upload"
                    >
                      <span>+</span> {/* Logo ou ícone */}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="sub-container-config">
              <div className="">
                <select
                  value={bgtypeFooter}
                  name="bgtypeFooter"
                  id="bgtypeFooter"
                  onChange={handleClearChangeF}
                >
                  <option value="" placeholder="Selecione um tipo de fundo">
                    Selecione um tipo de fundo
                  </option>
                  <option value="url" placeholder="https://exemplo.webp">
                    Link de uma imagem
                  </option>
                  <option value="file">Imagem</option>
                  <option value="color">Cor</option>
                </select>
                <br />

                {bgtypeFooter === "url" && (
                  <input
                    type="text"
                    placeholder="Insira o URL da imagem"
                    onPaste={handleUrlChangeF}
                  />
                )}

                {bgtypeFooter === "file" && (
                  <span class="tooltiptext">
                    <label className="custom-file-upload">
                      <input
                        type="file"
                        name="bgImage"
                        onChange={handleFileChangeF}
                      />
                      <span>+</span> {/* Logo ou ícone */}
                    </label>
                    Fundo Header
                  </span>
                )}

                {bgtypeFooter === "color" && (
                  <input
                    type="color"
                    name="bgColorF"
                    className="colorswitch"
                    value={footerData.bgColorF}
                    onChange={handleFooterChange}
                  />
                )}
              </div>
            </div>

            <br />
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <div className="sub-container-config">
                <label>
                  <input
                    type="checkbox"
                    name="logoTelWt"
                    id="logotelwt"
                    placeholder="LOGO Whatsapp"
                  />
                  LOGO
                </label>
                <label>
                  Número de Telefone:
                  <input
                    type="text"
                    value={footerData.tel}
                    onChange={handleTelChange} // Controle do número de telefone
                    maxLength="16"
                    placeholder="(00) 0 0000-0000"
                  />
                </label>
                <label>
                  <select
                    id="telfont"
                    value={telfont}
                    onChange={handleTelFontChange}
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
                    id="telfontSize"
                    value={telfontSize}
                    onChange={handleTelFontSizeChange}
                  >
                    <option value="12px">12px</option>
                    <option value="16px">16px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="28px">28px</option>
                    <option value="32px">32px</option>
                    <option value="36px">36px</option>
                  </select>

                  <label>
                    <input
                      type="color"
                      name="tituloColor"
                      className="colorswitch"
                      value={telColor} // Usa o valor de telColor no estado
                      onChange={handletelColorChange} // Chama a função para mudar a cor
                    />
                  </label>
                </label>
              </div>
            </div>

            <br />
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <div className="sub-container-config">
                <label>
                  Direitos:
                  <input
                    type="text"
                    value={footerData.right}
                    onChange={handleRightChange}
                    maxLength="50"
                    placeholder="Digite o nome de direito"
                  />
                </label>
                <label>
                  <select
                    id="rightFont"
                    value={footerData.rightFont}
                    onChange={handleRightFontChange}
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
                    id="rightFontSize"
                    value={footerData.rightFontSize}
                    onChange={handleRightFontSizeChange}
                  >
                    <option value="12px">12px</option>
                    <option value="16px">16px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="28px">28px</option>
                    <option value="32px">32px</option>
                    <option value="36px">36px</option>
                  </select>

                  <label>
                    <input
                      type="color"
                      value={footerData.rightColor}
                      onChange={handleRightColorChange}
                    />
                  </label>
                </label>
              </div>
            </div>

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
                  width: "100%",
                  padding: "4%",
                  borderRadius: "20px",
                  backgroundColor: "#bfdbfe",
                }}
              >
                {/*  */}
                <br />

                <label>
                  Escolha a rede social 1:
                  <select
                    name="socialIcon"
                    value={footerData.socialIcon}
                    onChange={(e) =>
                      handleFooterDataChange("socialIcon", e.target.value)
                    }
                  >
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </label>
                <br />
                <label>
                  Escreva a rede social:
                  <input
                    type="text"
                    placeholder="Digite o texto"
                    value={footerData.userInput}
                    onChange={(e) =>
                      handleFooterDataChange("userInput", e.target.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Escolha a cor do texto:
                  <input
                    type="color"
                    value={footerData.textColor}
                    onChange={(e) =>
                      handleFooterDataChange("textColor", e.target.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Escolha a cor da rede social 1:
                  <input
                    type="color"
                    value={footerData.logoColor}
                    onChange={(e) =>
                      handleFooterDataChange("logoColor", e.target.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Escolha a rede social 2:
                  <select
                    name="socialIcon2"
                    value={footerData.socialIcon2}
                    onChange={(e) =>
                      handleFooterDataChange("socialIcon2", e.target.value)
                    }
                  >
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </label>
                <br />
                <label>
                  Escreva o nome da rede 2:
                  <input
                    type="text"
                    placeholder="Digite o texto"
                    value={footerData.userInput2}
                    onChange={(e) =>
                      handleFooterDataChange("userInput2", e.target.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Escolha a cor do texto 2:
                  <input
                    type="color"
                    value={footerData.textColor2}
                    onChange={(e) =>
                      handleFooterDataChange("textColor2", e.target.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Escolha a cor da rede social 2:
                  <input
                    type="color"
                    value={footerData.logoColor2}
                    onChange={(e) =>
                      handleFooterDataChange("logoColor2", e.target.value)
                    }
                  />
                </label>

                {/* // */}
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
              width: "80%",
              padding: "10px",
              borderRadius: "20px 20px 0px 0px",
              backgroundColor: "#bfdbfe",
            }}
          >
            <h1>Preview</h1>
          </div>

          <div id="front-page" className="page" ref={contentRefs[0]}>
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
                  position={{
                    x: headerData.positionlogo,
                    y: headerData.positionlogoV,
                  }}
                  size={{
                    width: headerData.logoWidth || 100,
                    height: headerData.logoHeight || "auto",
                  }}
                  minWidth={50}
                  minHeight={0}
                  bounds="parent"
                  enableResizing={true}
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
                      logoWidth: ref.style.width, // Atualiza a largura no estado
                      logoHeight: ref.style.height, // Atualiza a altura no estado
                      positionlogo: position.x, // Atualiza a posição X no estado
                      positionlogoV: position.y, // Atualiza a posição Y no estado
                    }));
                  }}
                  style={{
                    overflow: "hidden", // Impede que a imagem ultrapasse a borda
                  }}
                >
                  <img
                    src={data?.headerData.logo || headerData.logo || null}
                    alt="logo"
                  />
                </Rnd>

                <Rnd
                  position={{
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
                <Rnd
                  position={{
                    x: headerData.positionduracao, // Posição inicial X do título
                    y: headerData.positionduracaoV, // Posição inicial Y do título
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
                      positionduracao: d.x, // Atualiza a posição X do título
                      positionduracaoV: d.y, // Atualiza a posição Y do título
                    }));
                  }}
                >
                  <p
                    style={{
                      color: headerData.duracaoColor,
                      fontFamily: headerData.duracaofont,
                      fontSize: headerData.duracaofontSize,
                      position: "relative",
                      transition: "left 0.3s ease",
                    }}
                  >
                    {headerData.duracao}
                  </p>
                </Rnd>
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
                style={{
                  backgroundColor: pageBgColorData,
                  paddingTop: headerData.headerHeight === 150 ? "2%" : "0%",
                  paddingBottom: headerData.headerHeight === 150 ? "4%" : "0%",
                }}
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
                            : "0px solid #ccc",
                        cursor: "pointer",
                      }}
                    >
                      <img src={card.image} alt={`Product ${index}`} />
                      <p>{card.description}</p>
                      <div id="bgprice">
                        <h1
                          style={{ color: cardcolorData.precocor || "white" }}
                        >
                          R${card.price}
                        </h1>
                      </div>
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
                      <div class="tooltip">
                        <input
                          type="file"
                          name="image"
                          id="file-upload-imgcard"
                          onChange={(e) =>
                            handleCardChange(editingCardIndex, {
                              target: {
                                name: "image",
                                value: URL.createObjectURL(e.target.files[0]),
                              },
                            })
                          }
                        />

                        <span class="tooltiptext">Imagem card</span>

                        <label
                          htmlFor="file-upload-imgcard"
                          className="custom-file-upload"
                        >
                          <span>+</span> {/* Logo ou ícone */}
                        </label>
                        <span class="tooltiptext">Imagem 3</span>
                      </div>
                      <br />
                      <label>
                        Descrição do Produto:
                        <input
                          type="text"
                          name="description"
                          value={cards[editingCardIndex].description}
                          onChange={(e) =>
                            handleCardChange(editingCardIndex, e)
                          }
                          placeholder="Descrição do Produto"
                        />
                      </label>
                      <label>
                        Preço:
                        <input
                          type="text"
                          name="price"
                          value={cards[editingCardIndex].price}
                          onChange={(e) =>
                            handleCardChange(editingCardIndex, e)
                          }
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
                backgroundColor: footerData.bgColorF,
                backgroundImage: footerData.bgImageF,

                border: "1px solid black",
              }}
              id="f1"
            >
              {footerData.logo && (
                <Rnd
                  position={{
                    x: footerData.positionlogofH,
                    y: footerData.positionlogofV,
                  }}
                  size={{
                    width: footerData.logoWidth || 100,
                    height: footerData.logoHeight || "auto",
                  }}
                  minWidth={50}
                  minHeight={50}
                  bounds="parent"
                  onDragStop={(e, d) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      positionlogofH: d.x, // Atualiza a posição X no estado
                      positionlogofV: d.y, // Atualiza a posição Y no estado
                    }));
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      logoWidth: ref.style.width, // Atualiza a largura no estado
                      logoHeight: ref.style.height, // Atualiza a altura no estado
                      positionlogofH: position.x, // Atualiza a posição X no estado
                      positionlogofV: position.y, // Atualiza a posição Y no estado
                    }));
                  }}
                >
                  <img src={footerData?.logo || ""} alt="logo-footer" />
                </Rnd>
              )}
              {footerData.image1f && (
                <Rnd
                  position={{
                    x: footerData.positionimg1fH,
                    y: footerData.positionimg1fV,
                  }}
                  size={{
                    width: footerData.widthimg1 || 100,
                    height: footerData.heightimg1 || "auto",
                  }}
                  minWidth={50}
                  minHeight={50}
                  bounds="parent"
                  enableResizing="true"
                  onDragStop={(e, d) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      positionimg1fH: d.x, // Atualiza a posição X no estado
                      positionimg1fV: d.y, // Atualiza a posição Y no estado
                    }));
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      widthimg1: ref.style.width, // Atualiza a largura no estado
                      heightimg1: ref.style.height, // Atualiza a altura no estado
                      positionimg1fH: position.x, // Atualiza a posição X no estado
                      positionimg1fV: position.y, // Atualiza a posição Y no estado
                    }));
                  }}
                >
                  <img src={footerData.image1f} alt="image-footer-1" />
                </Rnd>
              )}
              {footerData.image2f && (
                <Rnd
                  position={{
                    x: footerData.positionimg2fH,
                    y: footerData.positionimg2fV,
                  }}
                  size={{
                    width: footerData.widthimg2 || 100,
                    height: footerData.heightimg2 || "auto",
                  }}
                  minWidth={50}
                  minHeight={50}
                  bounds="parent"
                  enableResizing="true"
                  onDragStop={(e, d) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      positionimg2fH: d.x, // Atualiza a posição X no estado
                      positionimg2fV: d.y, // Atualiza a posição Y no estado
                    }));
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      widthimg2: ref.style.width, // Atualiza a largura no estado
                      heightimg2: ref.style.height, // Atualiza a altura no estado
                      positionimg2fH: position.x, // Atualiza a posição X no estado
                      positionimg2fV: position.y, // Atualiza a posição Y no estado
                    }));
                  }}
                >
                  <img src={footerData.image2f} alt="image-footer-2" />
                </Rnd>
              )}
              {footerData.image3f && (
                <Rnd
                  position={{
                    x: footerData.positionimg3fH,
                    y: footerData.positionimg3fV,
                  }}
                  size={{
                    width: footerData.widthimg3 || 100,
                    height: footerData.heightimg3 || "auto",
                  }}
                  minWidth={50}
                  minHeight={50}
                  bounds="parent"
                  enableResizing="true"
                  onDragStop={(e, d) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      positionimg3fH: d.x, // Atualiza a posição X no estado
                      positionimg3fV: d.y, // Atualiza a posição Y no estado
                    }));
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      widthimg3: ref.style.width, // Atualiza a largura no estado
                      heightimg3: ref.style.height, // Atualiza a altura no estado
                      positionimg3fH: position.x, // Atualiza a posição X no estado
                      positionimg3fV: position.y, // Atualiza a posição Y no estado
                    }));
                  }}
                >
                  <img src={footerData.image3f} alt="image-footer-3" />
                </Rnd>
              )}
              {footerData.image4f && (
                <Rnd
                  position={{
                    x: footerData.positionimg4fH,
                    y: footerData.positionimg4fV,
                  }}
                  size={{
                    width: footerData.widthimg4 || 100,
                    height: footerData.heightimg4 || "auto",
                  }}
                  minWidth={50}
                  minHeight={50}
                  bounds="parent"
                  enableResizing="true"
                  onDragStop={(e, d) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      positionimg4fH: d.x, // Atualiza a posição X no estado
                      positionimg4fV: d.y, // Atualiza a posição Y no estado
                    }));
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      widthimg4: ref.style.width, // Atualiza a largura no estado
                      heightimg4: ref.style.height, // Atualiza a altura no estado
                      positionimg4fH: position.x, // Atualiza a posição X no estado
                      positionimg4fV: position.y, // Atualiza a posição Y no estado
                    }));
                  }}
                >
                  <img src={footerData.image4f} alt="image-footer-4" />
                </Rnd>
              )}

              {footerData.tel && (
                <Rnd
                  position={{
                    x: footerData.positiontelfH,
                    y: footerData.positiontelfV,
                  }}
                  size={{ height: "auto" }}
                  minWidth={160}
                  maxHeight={25}
                  bounds="parent"
                  enableResizing={false}
                  onDragStop={(e, d) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      positiontelfH: d.x, // Atualiza a posição X no estado
                      positiontelfV: d.y, // Atualiza a posição Y no estado
                    }));
                  }}
                  style={{
                    cursor: "move",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={getSocialIcon(footerData.logotel)}
                      id="logotel"
                      style={{
                        fontSize: "30px",
                        marginRight: "10px",
                        color: footerData.logoTelColor || "green",
                      }}
                    />
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
                  </div>
                </Rnd>
              )}

              <Rnd
                position={{
                  x: footerData.positionsocial1fH,
                  y: footerData.positionsocial1fV,
                }}
                size={{ height: "auto" }}
                bounds="parent"
                enableResizing={false}
                onDragStop={(e, d) => {
                  setFooterData((prevData) => ({
                    ...prevData,
                    positionsocial1fH: d.x, // Atualiza a posição X no estado
                    positionsocial1fV: d.y, // Atualiza a posição Y no estado
                  }));
                }}
                style={{ cursor: "move" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={getSocialIcon(footerData.socialIcon)}
                    style={{
                      fontSize: "30px",
                      marginRight: "10px",
                      color: footerData.logoColor,
                    }}
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      margin: 0,
                      color: footerData.textColor,
                    }}
                  >
                    {footerData.userInput}
                  </p>
                </div>
              </Rnd>

              <Rnd
                position={{
                  x: footerData.positionsocial2fH,
                  y: footerData.positionsocial2fV,
                }}
                size={{ height: "auto" }}
                bounds="parent"
                enableResizing={false}
                onDragStop={(e, d) => {
                  setFooterData((prevData) => ({
                    ...prevData,
                    positionsocial2fH: d.x, // Atualiza a posição X no estado
                    positionsocial2fV: d.y, // Atualiza a posição Y no estado
                  }));
                }}
                style={{ cursor: "move" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={getSocialIcon(footerData.socialIcon2)}
                    style={{
                      fontSize: "30px",
                      marginRight: "10px",
                      color: footerData.logoColor2,
                    }}
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      margin: 0,
                      color: footerData.textColor2,
                    }}
                  >
                    {footerData.userInput2}
                  </p>
                </div>
              </Rnd>
            </footer>
            {/*  */}
          </div>
          <br />

          <br />
          {/*  */}
          <div id="back-page">
            <div
              className="page"
              style={{ backgroundColor: pageBgColorData }} // Aplica a cor de fundo
              ref={contentRefs[1]}
            >
              <div className="cards">
                {cardsExtension.map((card, index) => (
                  <div
                    key={index}
                    className="card"
                    onClick={() => openEditModalb(index)}
                    style={{
                      border:
                        selectedCardIndexb === index
                          ? "3px solid blue" // add a cor
                          : "0px solid #ccc",
                      cursor: "pointer",
                    }}
                  >
                    <img src={card.image} alt={`Product ${index}`} />
                    <p>{card.description}</p>
                    <div id="bgprice">
                      <h1 style={{ color: cardcolorData.precocor || "white" }}>
                        R${card.price}
                      </h1>
                    </div>
                  </div>
                ))}
                {editingCardIndexb !== null && (
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
                        <div class="tooltip">
                          <input
                            type="file"
                            name="image"
                            id="file-upload-imgcard"
                            onChange={(e) =>
                              handleCardChangeb(editingCardIndexb, {
                                target: {
                                  name: "image",
                                  value: URL.createObjectURL(e.target.files[0]),
                                },
                              })
                            }
                          />

                          <span class="tooltiptext">Imagem card</span>

                          <label
                            htmlFor="file-upload-imgcard"
                            className="custom-file-upload"
                          >
                            <span>+</span> {/* Logo ou ícone */}
                          </label>
                          <span class="tooltiptext">Imagem 3</span>
                        </div>
                        <br />
                        <label>
                          Descrição do Produto:
                          <input
                            type="text"
                            name="description"
                            value={
                              cardsExtension[editingCardIndexb].description
                            }
                            onChange={(e) =>
                              handleCardChangeb(editingCardIndexb, e)
                            }
                            placeholder="Descrição do Produto"
                          />
                        </label>
                        <label>
                          Preço:
                          <input
                            type="text"
                            name="price"
                            value={cardsExtension[editingCardIndexb].price}
                            onChange={(e) =>
                              handleCardChangeb(editingCardIndexb, e)
                            }
                            placeholder="9,99"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => handleRemoveCardb(editingCardIndexb)}
                        >
                          Remover
                        </button>
                      </form>
                      <button
                        onClick={closeEditModalb}
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
              <footer
                style={{
                  position: "relative",
                  height: `${footerData.footerHeight}px`, //altura definida pelo usuaruio no input
                  backgroundColor: footerData.bgColorF, // Aplica a cor de fundo ao "footer"
                  backgroundImage: footerData.bgImageF,
                  border: "1px solid black",
                }}
                id="f2"
              >
                {footerData.logo && (
                  <Rnd
                    position={{
                      x: footerData.positionlogofH,
                      y: footerData.positionlogofV,
                    }}
                    size={{
                      width: footerData.logoWidth || 100,
                      height: footerData.logoHeight || "auto",
                    }}
                    minWidth={50}
                    minHeight={50}
                    bounds="parent"
                    onDragStop={(e, d) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        positionlogofH: d.x, // Atualiza a posição X no estado
                        positionlogofV: d.y, // Atualiza a posição Y no estado
                      }));
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        logoWidth: ref.style.width, // Atualiza a largura no estado
                        logoHeight: ref.style.height, // Atualiza a altura no estado
                        positionlogofH: position.x, // Atualiza a posição X no estado
                        positionlogofV: position.y, // Atualiza a posição Y no estado
                      }));
                    }}
                  >
                    <img src={footerData?.logo || ""} alt="logo-footer" />
                  </Rnd>
                )}
                {footerData.image1f && (
                  <Rnd
                    position={{
                      x: footerData.positionimg1fH,
                      y: footerData.positionimg1fV,
                    }}
                    size={{
                      width: footerData.widthimg1 || 100,
                      height: footerData.heightimg1 || "auto",
                    }}
                    minWidth={50}
                    minHeight={50}
                    bounds="parent"
                    enableResizing="true"
                    onDragStop={(e, d) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        positionimg1fH: d.x, // Atualiza a posição X no estado
                        positionimg1fV: d.y, // Atualiza a posição Y no estado
                      }));
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        widthimg1: ref.style.width, // Atualiza a largura no estado
                        heightimg1: ref.style.height, // Atualiza a altura no estado
                        positionimg1fH: position.x, // Atualiza a posição X no estado
                        positionimg1fV: position.y, // Atualiza a posição Y no estado
                      }));
                    }}
                  >
                    <img src={footerData.image1f} alt="image-footer-1" />
                  </Rnd>
                )}
                {footerData.image2f && (
                  <Rnd
                    position={{
                      x: footerData.positionimg2fH,
                      y: footerData.positionimg2fV,
                    }}
                    size={{
                      width: footerData.widthimg2 || 100,
                      height: footerData.heightimg2 || "auto",
                    }}
                    minWidth={50}
                    minHeight={50}
                    bounds="parent"
                    enableResizing="true"
                    onDragStop={(e, d) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        positionimg2fH: d.x, // Atualiza a posição X no estado
                        positionimg2fV: d.y, // Atualiza a posição Y no estado
                      }));
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        widthimg2: ref.style.width, // Atualiza a largura no estado
                        heightimg2: ref.style.height, // Atualiza a altura no estado
                        positionimg2fH: position.x, // Atualiza a posição X no estado
                        positionimg2fV: position.y, // Atualiza a posição Y no estado
                      }));
                    }}
                  >
                    <img src={footerData.image2f} alt="image-footer-2" />
                  </Rnd>
                )}
                {footerData.image3f && (
                  <Rnd
                    position={{
                      x: footerData.positionimg3fH,
                      y: footerData.positionimg3fV,
                    }}
                    size={{
                      width: footerData.widthimg3 || 100,
                      height: footerData.heightimg3 || "auto",
                    }}
                    minWidth={50}
                    minHeight={50}
                    bounds="parent"
                    enableResizing="true"
                    onDragStop={(e, d) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        positionimg3fH: d.x, // Atualiza a posição X no estado
                        positionimg3fV: d.y, // Atualiza a posição Y no estado
                      }));
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        widthimg3: ref.style.width, // Atualiza a largura no estado
                        heightimg3: ref.style.height, // Atualiza a altura no estado
                        positionimg3fH: position.x, // Atualiza a posição X no estado
                        positionimg3fV: position.y, // Atualiza a posição Y no estado
                      }));
                    }}
                  >
                    <img src={footerData.image3f} alt="image-footer-3" />
                  </Rnd>
                )}
                {footerData.image4f && (
                  <Rnd
                    position={{
                      x: footerData.positionimg4fH,
                      y: footerData.positionimg4fV,
                    }}
                    size={{
                      width: footerData.widthimg4 || 100,
                      height: footerData.heightimg4 || "auto",
                    }}
                    minWidth={50}
                    minHeight={50}
                    bounds="parent"
                    enableResizing="true"
                    onDragStop={(e, d) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        positionimg4fH: d.x, // Atualiza a posição X no estado
                        positionimg4fV: d.y, // Atualiza a posição Y no estado
                      }));
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        widthimg4: ref.style.width, // Atualiza a largura no estado
                        heightimg4: ref.style.height, // Atualiza a altura no estado
                        positionimg4fH: position.x, // Atualiza a posição X no estado
                        positionimg4fV: position.y, // Atualiza a posição Y no estado
                      }));
                    }}
                  >
                    <img src={footerData.image4f} alt="image-footer-4" />
                  </Rnd>
                )}

                {footerData.tel && (
                  <Rnd
                    position={{
                      x: footerData.positiontelfH,
                      y: footerData.positiontelfV,
                    }}
                    size={{ height: "auto" }}
                    minWidth={160}
                    maxHeight={25}
                    bounds="parent"
                    enableResizing={false}
                    onDragStop={(e, d) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        positiontelfH: d.x, // Atualiza a posição X no estado
                        positiontelfV: d.y, // Atualiza a posição Y no estado
                      }));
                    }}
                    style={{
                      cursor: "move",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FontAwesomeIcon
                        icon={getSocialIcon(footerData.logotel)}
                        id="logotel"
                        style={{
                          fontSize: "30px",
                          marginRight: "10px",
                          color: footerData.logoTelColor || "green",
                        }}
                      />
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
                    </div>
                  </Rnd>
                )}
                {footerData.right && (
                  <Rnd
                    position={{
                      x: footerData.positionRightH,
                      y: footerData.positionRightV,
                    }}
                    size={{ height: "auto" }}
                    minWidth={160}
                    maxHeight={25}
                    bounds="parent"
                    enableResizing={false}
                    onDragStop={(e, d) => {
                      setFooterData((prevData) => ({
                        ...prevData,
                        positionRightH: d.x, // Atualiza a posição X no estado
                        positionRightV: d.y, // Atualiza a posição Y no estado
                      }));
                    }}
                    style={{
                      cursor: "move",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p
                        style={{
                          position: "relative",
                          fontFamily: footerData.rightFont,
                          fontSize: footerData.rightFontSize,
                          color: footerData.rightColor,
                        }}
                      >
                        {footerData.right}
                      </p>
                    </div>
                  </Rnd>
                )}

                <Rnd
                  position={{
                    x: footerData.positionsocial1fH,
                    y: footerData.positionsocial1fV,
                  }}
                  size={{ height: "auto" }}
                  bounds="parent"
                  enableResizing={false}
                  onDragStop={(e, d) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      positionsocial1fH: d.x, // Atualiza a posição X no estado
                      positionsocial1fV: d.y, // Atualiza a posição Y no estado
                    }));
                  }}
                  style={{ cursor: "move" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={getSocialIcon(footerData.socialIcon)}
                      style={{
                        fontSize: "30px",
                        marginRight: "10px",
                        color: footerData.logoColor,
                      }}
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        margin: 0,
                        color: footerData.textColor,
                      }}
                    >
                      {footerData.userInput}
                    </p>
                  </div>
                </Rnd>

                <Rnd
                  position={{
                    x: footerData.positionsocial2fH,
                    y: footerData.positionsocial2fV,
                  }}
                  size={{ height: "auto" }}
                  bounds="parent"
                  enableResizing={false}
                  onDragStop={(e, d) => {
                    setFooterData((prevData) => ({
                      ...prevData,
                      positionsocial2fH: d.x, // Atualiza a posição X no estado
                      positionsocial2fV: d.y, // Atualiza a posição Y no estado
                    }));
                  }}
                  style={{ cursor: "move" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon
                      icon={getSocialIcon(footerData.socialIcon2)}
                      style={{
                        fontSize: "30px",
                        marginRight: "10px",
                        color: footerData.logoColor2,
                      }}
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        margin: 0,
                        color: footerData.textColor2,
                      }}
                    >
                      {footerData.userInput2}
                    </p>
                  </div>
                </Rnd>
              </footer>
            </div>
          </div>
          {/*  */}
        </div>
        {/* salvamentoooo config */}
        <div
          style={{
            // backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            className="container-config"
            //container de configurações
            style={{
              display: "flex",
              flexDirection: "column",
              position: "fixed",
              right: "150px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                // margin: "3%",
                padding: "3%",
                borderRadius: "25px",
                backgroundColor: "#93c5fd",
              }}
            >
              <div className="sub-container-config">
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
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
                      Salvar
                    </span>
                  </button>

                  <button
                    onClick={generatePdf}
                    class="action_has has_saved"
                    aria-label="save"
                    type="button"
                  >
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                    >
                      <path
                        d="m19,21H5c-1.1,0-2-.9-2-2V5c0-1.1.9-2,2-2h11l5,5v11c0,1.1-.9,2-2,2Z"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        data-path="box"
                      ></path>
                      <path
                        d="M7 3L7 8L15 8"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        data-path="line-top"
                      ></path>
                      <path
                        d="M17 20L17 13L7 13L7 20"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        data-path="line-bottom"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Templetemercado;
