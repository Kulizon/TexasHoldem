import { Player } from "../../interfaces/Player";
import { Card } from "../../interfaces/Card";
import generateHand from "./generateHand";

const generateBots = (
  amountOfBots: number,
  blinds: { smallBlind: number; bigBlind: number },
  cards: Card[],
  initialBalance: number
): { bots: Player[]; usedCards: Card[] } => {
  const generatedBots: Player[] = [];
  let usedCards: Card[] = [];

  for (let i = 1; i <= amountOfBots; i++) {
    const blind = blinds.bigBlind === i ? "big" : blinds.smallBlind === i ? "small" : "none";
    const currentBet = blind === "big" ? 20 : blind === "small" ? 10 : 0;

    const hand = generateHand(cards, usedCards);

    usedCards = [...usedCards, ...hand];
    generatedBots.push({
      id: "b" + i,
      order: i + 1,
      name: "Player " + i,
      balance: initialBalance - currentBet,
      type: "bot",
      currentBet: currentBet,
      entireBet: currentBet,
      blind: blind,
      hand: hand,
    });
  }

  return { bots: generatedBots, usedCards: usedCards };
};

export default generateBots;
