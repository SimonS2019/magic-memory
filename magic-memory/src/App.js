import { useState, useEffect, useRef } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

let cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const fileInput = useRef(null);

  // shuffle cards for new game
  const shuffleCards = () => {
    const cards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(cards);
    setTurns(0);
    console.log(cards);
  };

  // handle a choice
  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // start new game automagically
  useEffect(() => {
    shuffleCards();
  }, []);

  const currentImageIndex = useRef(0);

  const handleFileUpload = () => {
    const file = fileInput.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (currentImageIndex.current < cardImages.length) {
          cardImages[currentImageIndex.current] = {
            src: reader.result,
            matched: false,
          };
          currentImageIndex.current += 1;
          shuffleCards();
        } else {
          alert("All images have been replaced. Please start a new game.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <button
        onClick={() => {
          fileInput.current.click();
          fileInput.current.onchange = () => {
            handleFileUpload();
          };
        }}
      >
        Upload and Replace Image
      </button>
      <input
        type="file"
        ref={fileInput}
        accept="image/*"
        style={{ display: "none" }}
      />

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
