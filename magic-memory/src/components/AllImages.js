import React from "react";

export default function AllImages({ cards }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {cards.map((card, index) => (
        <div key={index} style={{ flex: "0 0 auto", margin: "5px" }}>
          <img
            src={card.src}
            alt={`card-${index}`}
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
