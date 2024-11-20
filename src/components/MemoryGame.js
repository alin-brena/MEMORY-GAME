import React, { useState, useEffect } from 'react';

const generateCards = () => {
  const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const shuffled = [...values, ...values].sort(() => Math.random() - 0.5);
  return shuffled.map(value => ({ value, flipped: false }));
};

function MemoryGame() {
  const [cards] = useState(generateCards());  // Eliminamos setCards ya que no se usa
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedCards(prevMatchedCards => [...prevMatchedCards, cards[firstIndex].value]);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  }, [flippedIndices, cards, matchedCards]);  // Agregamos cards y matchedCards a las dependencias

  const handleClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedCards.includes(cards[index].value)) {
      setFlippedIndices(prevIndices => [...prevIndices, index]);
    }
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <div className="memory-board">
        {cards.map((card, index) => (
          <button 
            key={index} 
            className="card" 
            onClick={() => handleClick(index)}
            disabled={flippedIndices.includes(index) || matchedCards.includes(card.value)}
          >
            {flippedIndices.includes(index) || matchedCards.includes(card.value) ? card.value : '?'}
          </button>
        ))}
      </div>
      {matchedCards.length === cards.length / 2 && <p>You won!</p>}
    </div>
  );
}

export default MemoryGame;
