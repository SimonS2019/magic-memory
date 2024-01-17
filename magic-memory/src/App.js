import { useState } from "react";
import "./App.css";

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // shuffle cards for new game
  const shuffleCards = () => {
    const cards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) // this line is used to shuffle the cards
      .map((card) => ({ ...card, id: Math.random() })); // add an id to each card

    // if sorting numbers, a - b will sort in ascending order]=
    // if sorting strings, a.localeCompare(b) will sort in ascending order

    // math.random() is a function that returns a random number between 0 and 1
    // math.random() - 0.5 will return a random number between -0.5 and 0.5
    // if the result is negative, the first card will be placed before the second card
    // if the result is positive, the second card will be placed before the first card
    console.log(cards);
    setCards(cards);
    setTurns(0);
  };

  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
    </div>
  );
}

export default App;
