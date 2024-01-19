import { useState, useEffect, useRef } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import AllImages from "./components/AllImages";

let cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
// Original images
let originalImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

let hayaImages = [
  { src: "/haya/Haya1.jpg", matched: false },
  { src: "/haya/Haya2.jpg", matched: false },
  { src: "/haya/Haya3.jpg", matched: false },
  { src: "/haya/Haya4.jpg", matched: false },
  { src: "/haya/Haya5.jpg", matched: false },
  { src: "/haya/Haya6.jpg", matched: false },
  // { src: "/haya/Haya7.jpg", matched: false },
];

let simonImages = [
  { src: "/simon/simon1.jpg", matched: false },
  { src: "/simon/simon2.jpg", matched: false },
  { src: "/simon/simon3.jpg", matched: false },
  { src: "/simon/simon4.jpg", matched: false },
  { src: "/simon/simon5.png", matched: false },
  { src: "/simon/simon6.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const fileInput = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // shuffle cards for new game
  const shuffleCards = () => {
    const cards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(cards);
    setTurns(0);
    setIsVisible(true);
    console.log(cards);
  };

  // handle a choice
  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    setIsVisible(false);
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
  const handleHayaImages = () => {
    const date = window.prompt("Enter the date when we became a couple.(dd/mm/yyyy)");
    if (date === "01012024") { // replace "correctDate" with the actual date
      cardImages = [...hayaImages];
      shuffleCards();
    } else {
      alert("Incorrect date, you are not my girlfriend!!!");
    }
  };
  const handleDefault = () => {
    cardImages = [...originalImages];
    shuffleCards();
  };
  const handleSimonImages = () => {
    cardImages = [...simonImages];
    shuffleCards();
  };
  const currentImageIndex = useRef(0);

  const handleFileUpload = () => {
    console.log("handleFileUpload");
    const files = fileInput.current.files;
    if (files.length > cardImages.length) {
      alert(`You can only upload a maximum of ${cardImages.length} files!`);
      return;
    }

    Array.from(files).forEach((file, index) => {
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
    });

    // Reset the file input so the same file can be selected again if needed
    fileInput.current.value = null;
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button
        className="btn"
        onClick={handleDefault}
        title="Start a new game with original images"
      >
        New Game
      </button>
      {isVisible && (
        <button
          className="btn"
          onClick={() => {
            fileInput.current.click();
            fileInput.current.onchange = handleFileUpload;
          }}
        >
          Upload and Replace Image
        </button>
      )}
      <button className="btn" onClick={handleHayaImages}>
        Use Haya's Images
      </button>

      <button className="btn" onClick={handleSimonImages}>
        Use Simon's Images
      </button>
      <input
        type="file"
        id="fileUpload"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInput}
        max={cardImages.length}
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

      {isVisible && <AllImages cards={cardImages} />}
    </div>
  );
}

export default App;
