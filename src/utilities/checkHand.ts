import { Card } from "../interfaces/Card";
import {
  isRoyalFlush,
  isStraightFlush,
  isFourOfKind,
  isFullHouse,
  isFlush,
  isStraight,
  isThreeOfKind,
  hasPairs,
  findHighCard,
} from "./calculatingHands/handsFunctions";
import { mapColors, mapValues } from "./calculatingHands/mapFunctions";
import { CalculatedHand } from "../interfaces/CalculatedHand";

const sortCards = (cards: Card[]) => {
  const sortedCards: Card[] = [...cards];

  for (let i = 0; i < sortedCards.length; i++) {
    for (let n = 0; n < sortedCards.length - 1; n++) {
      if (sortedCards[n].value > sortedCards[n + 1].value) {
        const h = sortedCards[n];
        sortedCards[n] = sortedCards[n + 1];
        sortedCards[n + 1] = h;
      }
    }
  }

  return sortedCards;
};

export const checkHand = (h: { playerID: string; hand: Card[]; deck: Card[] }) => {
  const allPlayerCards = [...h.hand, ...h.deck];

  const colors = allPlayerCards.map((c) => c.color);
  const values = allPlayerCards.map((c) => c.value);

  const mappedColors = mapColors(colors);
  const mappedValues = mapValues(values as unknown as string[]);

  const playerHand = sortCards([...h.hand, ...h.deck]);

  const calculatedHand: CalculatedHand = {
    playerID: h.playerID,
    handName: "",
    power: 0,
    maxHandPower: 0,
    highCard: 0,
  };

  if (isRoyalFlush(mappedColors, mappedValues, playerHand).isHand) {
    calculatedHand.handName = "royal-flush";
    calculatedHand.maxHandPower = 69;
    calculatedHand.power = 10;
  } else if (isStraightFlush(mappedColors, mappedValues, playerHand).isHand) {
    const maxHandPower = isStraightFlush(mappedColors, mappedValues, playerHand).maxHandPower;

    calculatedHand.handName = "straight-flush";
    calculatedHand.maxHandPower = maxHandPower;
    calculatedHand.power = 9;
  } else if (isFourOfKind(mappedColors, mappedValues, playerHand).isHand) {
    const maxHandPower = isFourOfKind(mappedColors, mappedValues, playerHand).maxHandPower;

    calculatedHand.handName = "four-of-a-kind";
    calculatedHand.maxHandPower = maxHandPower;
    calculatedHand.power = 8;
  } else if (isFullHouse(mappedColors, mappedValues, playerHand).isHand) {
    const maxHandPower = isFullHouse(mappedColors, mappedValues, playerHand).maxHandPower;

    calculatedHand.handName = "full-house";
    calculatedHand.maxHandPower = maxHandPower;
    calculatedHand.power = 7;
  } else if (isFlush(mappedColors, mappedValues, playerHand).isHand) {
    const maxHandPower = isFlush(mappedColors, mappedValues, playerHand).maxHandPower;

    calculatedHand.handName = "flush";
    calculatedHand.maxHandPower = maxHandPower;
    calculatedHand.power = 6;
  } else if (isStraight(mappedColors, mappedValues, playerHand).isHand) {
    const maxHandPower = isStraight(mappedColors, mappedValues, playerHand).maxHandPower;

    calculatedHand.handName = "straight";
    calculatedHand.maxHandPower = maxHandPower;
    calculatedHand.power = 5;
  } else if (isThreeOfKind(mappedColors, mappedValues, playerHand).isHand) {
    const maxHandPower = isThreeOfKind(mappedColors, mappedValues, playerHand).maxHandPower;

    calculatedHand.handName = "three-of-a-kind";
    calculatedHand.maxHandPower = maxHandPower;
    calculatedHand.power = 4;
  } else if (hasPairs(mappedColors, mappedValues, playerHand).amountOfPairs > 0) {
    const { amountOfPairs, maxHandPower } = hasPairs(mappedColors, mappedValues, playerHand);

    if (amountOfPairs === 2) {
      calculatedHand.handName = "two-pairs";
      calculatedHand.maxHandPower = maxHandPower;
      calculatedHand.power = 3;
    }

    if (amountOfPairs === 1) {
      calculatedHand.handName = "one-pair";
      calculatedHand.maxHandPower = maxHandPower;
      calculatedHand.power = 2;
    }
  } else {
    const highCard = findHighCard(mappedColors, mappedValues, h.hand);
    calculatedHand.handName = "high-card";
    calculatedHand.maxHandPower = highCard;
    calculatedHand.power = 1;
  }

  calculatedHand.highCard = findHighCard(mappedColors, mappedValues, h.hand);

  return calculatedHand;
};
