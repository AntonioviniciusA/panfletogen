import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Templetemercado = () => {
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
  });

  const [positionduracao, setPositionduracao] = useState(0);

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

  const [duracaofontSize, setduracaoFontSize] = useState("16px");
  const handleDuracaoFontSizeChange = (e) => {
    setduracaoFontSize(e.target.value);
    setHeaderData((prevData) => ({
      ...prevData,
      duracaofontSize: e.target.value,
    }));
  };
  const [bgImage, setBgImage] = useState("");

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setBgImage(`url(${url})`);
    setHeaderData((prevData) => ({
      ...prevData,
      bgUrl: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setBgImage(`url(${fileUrl})`);
      const { file } = e.target;
      setHeaderData((prevData) => ({
        ...prevData,
        file: URL.createObjectURL(e.target.files[0]),
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
  {
    /* header*/
  }
  {
    /* SALVA O DOCUMENTO*/
  }
  const handleSavePanfleto = (e) => {
    e.preventDefault();
    saveFormData();
    localStorage.setItem("frontContent", JSON.stringify({ headerData }));
    alert("Panfleto salvo! Apertem em (ok) para continuar");
    navigate("/panfleto-mercado");
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
      JSON.stringify({ bgtypeheader, headerData })
    );
  };

  // Carrega os dados salvos do localStorage ao montar o componente
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setBgTypeHeader(savedData.bgtypeheader);
      setHeaderData(savedData.headerData);
    }
  }, []);
  {
    /* SALVA HISTORICO DO USUARIO*/
  }
  return (
    <>
      <form
        onSubmit={Templetemercado}
        className="bg-gray-500 flex flex-col content-center"
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
            <option value="" placeholder="Selecione um tipo de fundo">
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
            <input type="file" onChange={handleFileChange} />
          )}

          {bgtypeheader === "color" && (
            <input
              type={bgtypeheader}
              name="bgColor"
              className="colorswitch"
              value={headerData.bgColor}
              onChange={handleHeaderChange}
            />
          )}
        </div>
        <br />
        <div>
          <div>
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
              Frase Promocional:
              <input
                type="text"
                name="titulo"
                value={headerData.titulo}
                onChange={handleHeaderChange}
                placeholder="Economia Garantida Toda Semana! Descubra as Ofertas Imperdíveis do Supermercado XYZ!"
              />
            </label>
            <label>
              Cor do Titulo:
              <input
                type="color"
                name="tituloColor"
                className="colorswitch"
                value={headerData.tituloColor}
                onChange={handleHeaderChange}
              />
            </label>
            <label>
              Escolha do o tamanho da letra do titulo:
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
            </label>
          </div>
          <div>
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

            <label>
              Cor da validade:
              <input
                type="color"
                name="duracaoColor"
                className="colorswitch"
                value={headerData.duracaoColor}
                onChange={handleHeaderChange}
              />
            </label>
            <label>
              Escolha do o tamanho da letra da validade
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
            </label>
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
          </div>
        </div>
        {/*PRODUTOS*/}
        <div></div>
      </form>
      {/* Preview*/}
      <div className="preview container">
        <h1>Preview</h1>
        <div id="front-page" className="page">
          {headerData && (
            <header
              style={{
                backgroundColor: headerData.bgColor,
                backgroundImage: headerData.bgImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div>
                <img src={headerData.logo} width={200} alt="logo" />
                <h1
                  style={{
                    color: headerData.tituloColor,
                    fontSize: headerData.titulofontSize,
                  }}
                >
                  {headerData.titulo}
                </h1>
                <p
                  style={{
                    color: headerData.duracaoColor,
                    fontSize: headerData.duracaofontSize,
                    position: "relative",
                    left: headerData.positionduracao,
                    transition: "left 0.3s ease",
                  }}
                >
                  {headerData.duracao}
                </p>
              </div>
            </header>
          )}
        </div>
      </div>
      <button onClick={handleSavePanfleto}>Salvar e ir </button>
    </>
  );
};
export default Templetemercado;
