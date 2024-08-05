import React, { useState } from "react";
import "../style.css";

const BackForm = () => {
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
    paymentMethods: [],
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

  const handlePaymentMethodChange = (e) => {
    const { files } = e.target;
    const paymentMethods = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setFooterData({ ...footerData, paymentMethods });
  };

  const handleSave = () => {
    localStorage.setItem(
      "backContent",
      JSON.stringify({ headerData, cardcolorData, cards, footerData })
    );
    alert("Informações do verso salvas!");
  };

  return (
    <div>
      <h2>Configuração do Verso do Panfleto</h2>
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

        <input
          type="text"
          name="description"
          value={headerData.description}
          onChange={handleHeaderChange}
          placeholder="Descrição da Promoção"
        />
        <input
          type="text"
          name="duration"
          value={headerData.duration}
          onChange={handleHeaderChange}
          placeholder="Data de Duração"
        />
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
            <input
              type="number"
              name="price"
              value={card.price}
              onChange={(e) => handleCardChange(index, e)}
              placeholder="9,99"
            />
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
          Coloque um texto atrativo
          <input
            type="text"
            name="text"
            value={footerData.text}
            onChange={handleFooterChange}
            placeholder="Aproveite nossas ofertas exclusivas da semana e economize ainda mais!"
          />
        </label>
        <label>
          Coloque a imagem com seus metodos de pagamento:
          <input
            type="file"
            name="paymentMethods"
            className="paymentMethods"
            onChange={handlePaymentMethodChange}
            multiple
          />
        </label>
        Coloque a imagem com seus metodos de pagamento:
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
      <button onClick={handleSave}>Salvar Verso</button>
    </div>
  );
};

export default BackForm;
