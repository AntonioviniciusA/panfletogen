import React from "react";

function CardsList({
  cards,
  handleCardChange,
  handleAddCard,
  handleRemoveCard,
  cardcolorData,
  handleCardColorChange,
}) {
  return (
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
    </div>
  );
}

export default CardsList;
