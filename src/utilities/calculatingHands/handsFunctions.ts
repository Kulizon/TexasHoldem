import { ColorsMap } from "./mapFunctions";
import { ValuesMap } from "./mapFunctions";
import { Card } from "../../interfaces/Card";

export const isRoyalFlush = (colors: ColorsMap, values: ValuesMap, cards: Card[]) => {
  let isHand = false;

  let cardValue = 10;
  for (const key in colors) {
    if (colors[key as keyof ColorsMap] >= 5) {
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        if (c.value === cardValue && c.color === key) {
          cardValue += 1;
        }
      }
    }
  }

  if (cardValue === 15) isHand = true;

  return { isHand: isHand, maxHandPower: 69 };
};

export const isStraightFlush = (colors: ColorsMap, values: ValuesMap, cards: Card[]) => {
  let isHand = false;

  let potentialFlushColor: string = "";
  for (const key in colors) {
    if (colors[key as keyof ColorsMap] >= 5) {
      potentialFlushColor = key;
    }
  }

  if (!potentialFlushColor) return { isHand: isHand, maxHandPower: 0 };

  let streak = 0;
  let start = 1;
  let streakValue = 0;

  if (cards[0].color === potentialFlushColor) {
    start = 1;
    streakValue = cards[0].value;
  } else if (cards[1].color === potentialFlushColor) {
    start = 2;
    streakValue = cards[1].value;
  } else {
    start = 3;
    streakValue = cards[2].value;
  }

  for (let i = start; i < cards.length; i++) {
    if (cards[i].value === streakValue + 1 && cards[i].color === potentialFlushColor) {
      streak += 1;
      streakValue += 1;
    } else if (cards[i].value === streakValue && cards[i].color === potentialFlushColor) {
      streakValue = cards[i].value;
    } else if (streak < 4) {
      streak = 0;
      streakValue = cards[i].value;
    }
  }

  if (streak >= 4) isHand = true;

  return { isHand: isHand, maxHandPower: streakValue };
};

export const isFourOfKind = (colors: ColorsMap, values: ValuesMap, cards: Card[]) => {
  let isHand = false;
  let maxHandPower = 0;

  for (const key in values) {
    if (values[key as unknown as keyof ValuesMap] === 4) {
      isHand = true;
      maxHandPower = +key * 4;
    }
  }

  return { isHand: isHand, maxHandPower: maxHandPower };
};

export const isFullHouse = (colors: ColorsMap, values: ValuesMap, cards: Card[]) => {
  let isHand = false;
  let maxHandPower = 0;

  let mainHouse = false;
  let sideHouse = false;

  for (const key in values) {
    const value = values[key as unknown as keyof ValuesMap];
    if (value === 3 && !mainHouse) {
      mainHouse = true;
      maxHandPower += value * 30;
    } else if (value >= 2) {
      sideHouse = true;
      maxHandPower += value * 2;
    }
  }

  if (mainHouse && sideHouse) isHand = true;

  return { isHand: isHand, maxHandPower: maxHandPower };
};

export const isFlush = (colors: ColorsMap, values: ValuesMap, cards: Card[]) => {
  let isHand = false;
  let maxHandPower = 0;

  const combo: Card[] = [];

  for (const key in colors) {
    if (colors[key as unknown as keyof ColorsMap] >= 5) {
      isHand = true;

      combo.push(...cards.filter((c) => c.color === key));
    }
  }

  combo.forEach((c) => {
    if (c.value > maxHandPower) maxHandPower = c.value;
  });

  return { isHand: isHand, maxHandPower: maxHandPower };
};

export const isStraight = (colors: ColorsMap, values: ValuesMap, cards: Card[]) => {
  let isHand = false;

  let streak = 0;
  let streakValue = cards[0].value;

  for (let i = 1; i < cards.length; i++) {
    if (cards[i].value === streakValue + 1) {
      streak += 1;
      streakValue += 1;
    } else if (cards[i].value === streakValue) {
      streakValue = cards[i].value;
    } else if (streak < 4) {
      streak = 0;
      streakValue = cards[i].value;
    }
  }

  if (streak >= 4) isHand = true;

  return { isHand: isHand, maxHandPower: streakValue };
};

export const isThreeOfKind = (colors: ColorsMap, values: ValuesMap, cards: Card[]) => {
  let isHand = false;
  let maxHandPower = 0;

  for (const key in values) {
    const value = values[key as unknown as keyof ValuesMap];
    if (value === 3) {
      isHand = true;

      const threeCards = cards.filter((c) => c.value === +key);
      maxHandPower = 3 * threeCards[0].value;
    }
  }
  return { isHand: isHand, maxHandPower: maxHandPower };
};

export const hasPairs = (colors: ColorsMap, values: ValuesMap, cards: Card[]) => {
  let pairCounter = 0;
  let maxHandPower = 0;

  for (const key in values) {
    const value = values[key as unknown as keyof ValuesMap];
    if (value === 2) {
      maxHandPower += +key * 2;
      pairCounter++;
    }
  }

  return { amountOfPairs: pairCounter, maxHandPower: maxHandPower };
};

export const findHighCard = (colors: ColorsMap, values: ValuesMap, cards: Card[]) => {
  let highCard = 0;

  for (const key in values) {
    const value = values[key as unknown as keyof ValuesMap];

    if (value >= 1 && +key > highCard) highCard = +key;
  }

  return highCard;
};
