import { Card } from "../interfaces/Card";

const getRandomCard = (cards: Card[], usedCards: Card[]) => {
  let randomIndex = Math.floor(Math.random() * cards.length);
  const ids = usedCards.map((c) => c.id);

  while (ids.includes(cards[randomIndex].id)) {
    randomIndex = Math.floor(Math.random() * cards.length);
  }

  return cards[randomIndex];
};

export default getRandomCard;
