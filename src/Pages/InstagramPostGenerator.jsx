import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import "../style/InstagramPostGenerator.css";

function InstagramPostGenerator() {
  const [Produto, setProduto] = useState(null);
  const [LogoPost, setLogoPost] = useState(null);
  const [text, setText] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productVolume, setProductVolume] = useState("");
  const [productValidity, setProductValidity] = useState("");
  const postRef = useRef(null);

  const generateStoryImage = async () => {
    if (!postRef.current) {
      console.warn("Elemento HTML não encontrado.");
      return;
    }

    try {
      // Gera o PNG do elemento HTML
      const dataUrl = await toPng(postRef.current, {
        cacheBust: true,
        width: 1080, // Largura recomendada para Stories do Instagram
        height: 1920, // Altura recomendada para Stories do Instagram
        style: {
          transform: "scale(1)", // Remove escalas indesejadas
          transformOrigin: "top left",
          backgroundColor: "#ffffff", // Cor de fundo para capturas
        },
      });

      // Salva o arquivo como uma imagem
      saveAs(dataUrl, "instagram-story.png");
    } catch (error) {
      console.error("Erro ao gerar a imagem:", error);
    }
  };

  const handleProdutoUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setProduto(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const handleLogoPostUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPost(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleTextChange = (event) => {
    const inputText = event.target.value;
    setText(inputText);

    // Regex para capturar nome, volume, preço e data de validade
    const match = inputText.match(
      /(.+)\s(\d+(?:[.,]\d+)?l)\s(\d+[\.,]?\d{2})\s(\d{2}\/\d{2}\/\d{4})/
    );

    if (match) {
      setProductName(match[1].trim());
      setProductPrice(match[3].trim());
      setProductVolume(match[2].trim());
      setProductValidity(match[4].trim());
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Gerador de Post para Instagram</h1>
      <label className="custom-file-upload">
        <input
          type="file"
          name="LogoPost"
          accept="image/*"
          onChange={handleLogoPostUpload}
        />
        <span>Logo +</span>
      </label>
      <label className="custom-file-upload">
        <input
          type="file"
          name="Produto"
          accept="image/*"
          onChange={handleProdutoUpload}
        />
        <span>Foto produto +</span>
      </label>
      <br />
      <input
        type="text"
        placeholder="Nome do Produto e Preço (ex: Sorvete Amor ao Pote 15,99)"
        value={text}
        onChange={handleTextChange}
        style={{ marginTop: "10px", padding: "10px", width: "80%" }}
      />
      {/* {gerador preview} */}
      <div
        ref={postRef}
        style={{
          backgroundColor: "#f5f5f5",
          width: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
          padding: "10px",
          color: "#333",
          overflow: "hidden",
        }}
      >
        <div className="InstagramPostGenerator">
          <div class="container">
            {LogoPost && (
              <img
                alt="LogoPost"
                class="LogoPost"
                src={LogoPost}
                style={{
                  Width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            )}
            <div class="validity">Válido até {productValidity}</div>
            <div class="highlight">
              <img
                alt="Highlight background"
                src="https://placehold.co/300x400"
              />
            </div>
            {Produto && (
              <img
                alt="Produto"
                class="Produto"
                src={Produto}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            )}
            <div class="price">R${productPrice}</div>
            <div>
              {productName}
              {productVolume}
            </div>
            <div class="novidade">Promoção</div>
          </div>
        </div>
      </div>
      <button
        onClick={generateStoryImage}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          color: "black",
          zIndex: "3",
        }}
      >
        Gerar Post
      </button>
    </div>
  );
}

export default InstagramPostGenerator;
