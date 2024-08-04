import React, { useState } from "react";
import "../style.css";

const BackForm = () => {
  const [headerData, setHeaderData] = useState({
    logo: "",
    description: "",
    duration: "",
    image: "",
    bgColor: "#ffffff",
  });
  const [cards, setCards] = useState([]);
  const [footerData, setFooterData] = useState({
    text: "",
    paymentMethods: [],
    bgColor: "#ffffff",
  });

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
      JSON.stringify({ headerData, cards, footerData })
    );
    alert("Informações do verso salvas!");
  };

  return (
    <div>
      <h2>Configuração do Verso do Panfleto</h2>
      <div>
        <h3>Header</h3>
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
        <input
          type="color"
          name="bgColor"
          className="colorswitch"
          value={headerData.bgColor}
          onChange={handleHeaderChange}
        />
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
              type="text"
              name="price"
              value={card.price}
              onChange={(e) => handleCardChange(index, e)}
              placeholder="Preço"
            />
            <button onClick={() => handleRemoveCard(index)}>Remover</button>
          </div>
        ))}
        <button onClick={handleAddCard}>Adicionar Card</button>
      </div>
      <div>
        <h3>Footer</h3>
        <input
          type="text"
          name="text"
          value={footerData.text}
          onChange={handleFooterChange}
          placeholder="Texto Atrativo"
        />
        <input
          type="file"
          name="paymentMethods"
          onChange={handlePaymentMethodChange}
          multiple
        />
        <input
          type="color"
          name="bgColor"
          className="colorswitch"
          value={footerData.bgColor}
          onChange={handleFooterChange}
        />
      </div>
      <button onClick={handleSave}>Salvar Verso</button>
    </div>
  );
};

export default BackForm;
