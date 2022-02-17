import { Card } from "../../interfaces/Card";
import getRandomCard from "../getRandomCard";

const generateHand = (cards: Card[], usedCards: Card[]): Card[] => {
  const firstCard = getRandomCard(cards, usedCards);
  let secondCard = getRandomCard(cards, usedCards);

  while (firstCard.id === secondCard.id) {
    secondCard = getRandomCard(cards, usedCards);
  }

  return [firstCard, secondCard];
};

export default generateHand;
