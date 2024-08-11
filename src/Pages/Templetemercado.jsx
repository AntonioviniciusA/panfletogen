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
    duracao: "",
    titulocolor: "",
    duracaocolor: "",
  });
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
      <form onSubmit={Templetemercado}>
        <div>
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
                name="titulocolor"
                className="colorswitch"
                value={headerData.titulocolor}
                onChange={handleHeaderChange}
              />
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
                name="duracaocolor"
                className="colorswitch"
                value={headerData.duracaocolor}
                onChange={handleHeaderChange}
              />
            </label>
          </div>
        </div>
        {/*PRODUTOS*/}
        <div></div>
      </form>
      {/* Preview*/}
      <div className="preview container">
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
                <h1>{headerData.titulo}</h1>
                <p>{headerData.duracao}</p>
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
