import React from 'react'

export default function AllImages({ cards }) {
  return (
    <div className="all-images">
      {cards.map((card, index) => (
        <img key={index} src={card.src} alt={`card-${index}`} />
      ))}
    </div>
  )
}