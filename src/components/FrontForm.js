import React, { useState } from "react";
import "../style.css";

const FrontForm = () => {
  const [headerData, setHeaderData] = useState({
    logo: "",
    description: "",
    duration: "",
    image: "",
    bgColor: "#ffffff",
    textColor: "#000000",
  });
  const [cards, setCards] = useState([]);
  const [footerData, setFooterData] = useState({
    text: "",
    address: "",
    hours: "",
    bgColor: "#ffffff",
    textColor: "#000000",
  });
  const [cardcolorData, setCardColorData] = useState({
    precocor: "#000000",
  });
  const handleCardColorChange = (e) => {
    const { name, value } = e.target;
    setCardColorData({ ...cardcolorData, [name]: value });
  };
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaderData({ ...headerData, [name]: value });
  };

  const handleCardChange = (index, e) => {
    const { name, value } = e.target;
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [name]: value };
    setCards(newCards);
  };

  const handleAddCard = () => {
    setCards([...cards, { image: "", description: "", price: "" }]);
  };

  const handleRemoveCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  const handleFooterChange = (e) => {
    const { name, value } = e.target;
    setFooterData({ ...footerData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem(
      "frontContent",
      JSON.stringify({ headerData, cardcolorData, cards, footerData })
    );
    alert("Informações da frente salvas!");
  };

  return (
    <div>
      <h2>Configuração da Frente do Panfleto</h2>
      <div>
        <h3>Header</h3>

        <label>
          Logo(png):
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
        </label>
        <label>
          Frase Promocional
          <input
            type="text"
            name="description"
            value={headerData.description}
            onChange={handleHeaderChange}
            placeholder="Economia Garantida Toda Semana! Descubra as Ofertas Imperdíveis do Supermercado XYZ!"
          />
        </label>

        <label>
          validade da Promoção
          <input
            type="text"
            name="duration"
            value={headerData.duration}
            onChange={handleHeaderChange}
            placeholder="Valido do dia 99 ao dia 99 de ago"
          />
        </label>

        <label>
          imagem para subtiuir o header(png):
          <input
            type="file"
            name="image"
            onChange={(e) =>
              setHeaderData({
                ...headerData,
                image: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
        </label>

        <label>
          Cor do fundo:
          <input
            type="color"
            name="bgColor"
            className="colorswitch"
            value={headerData.bgColor}
            onChange={handleHeaderChange}
          />
        </label>

        <label>
          Cor do texto:
          <input
            type="color"
            name="textColor"
            className="colorswitch"
            value={headerData.textColor}
            onChange={handleHeaderChange}
          />
        </label>
      </div>

      <div>
        <h3>Cards</h3>
        {cards.map((card, index) => (
          <div key={index}>
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
                type="number"
                name="price"
                value={card.price}
                onChange={(e) => handleCardChange(index, e)}
                placeholder="9,99"
              />
            </label>

            <button onClick={() => handleRemoveCard(index)}>Remover</button>
          </div>
        ))}

        <button onClick={handleAddCard}>Adicionar Card</button>
      </div>
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

      <div>
        <h3>Footer</h3>
        <label>
          Coloque um texto atrativo:
          <input
            type="text"
            name="text"
            value={footerData.text}
            onChange={handleFooterChange}
            placeholder="LOJA XYZ - Qualidade e Economia Sempre Perto de Você!"
          />
        </label>

        <label>
          Endereço:
          <input
            type="text"
            name="address"
            value={footerData.address}
            onChange={handleFooterChange}
            placeholder="Rua das Compras, 123 - Centro"
          />
        </label>

        <label>
          Horario de Funcionamento:
          <input
            type="text"
            name="hours"
            value={footerData.hours}
            onChange={handleFooterChange}
            placeholder="Horário de Funcionamento: Segunda a Sábado, das 8h às 22h | Domingo, das 9h às 18h"
          />
        </label>

        <label>
          Cor do fundo:
          <input
            type="color"
            name="bgColor"
            className="colorswitch"
            value={footerData.bgColor}
            onChange={handleFooterChange}
          />
        </label>

        <label>
          Cor do texto:
          <input
            type="color"
            name="textColor"
            className="colorswitch"
            value={footerData.textColor}
            onChange={handleFooterChange}
          />
        </label>
      </div>
      <button onClick={handleSave}>Salvar Frente</button>
    </div>
  );
};

export default FrontForm;
