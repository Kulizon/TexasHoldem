import { choiceBasedOnOdds } from "./choiceBasedOnOdds";
import { Card } from "../../interfaces/Card";
import { checkHand } from "../checkHand";

const makeChoice = (
  playerID: string,
  round: number,
  amountToCall: number,
  hand: Card[],
  deck: Card[]
): { choice: "raise"; amountToRaise: number } | { choice: "call" } | { choice: "fold" } => {
  const { power } = checkHand({ playerID: playerID, hand: [...hand, ...deck] });

  if (round === 1) {
    let firstRoundPower: 1 | 2 | 3 | 4 | 5 = 1;

    if (hand[0].value === hand[1].value && hand[0].color === hand[1].color) firstRoundPower = 5;
    else if (hand[0].value === hand[1].value) firstRoundPower = 4;
    else if (hand[0].color === hand[1].color) firstRoundPower = 3;
    else if (hand[0].value === hand[1].value + 1 || hand[1].value === hand[0].value + 1) firstRoundPower = 2;

    if (amountToCall > 0) {
      if (amountToCall <= 35) {
        if (firstRoundPower === 1) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 25 },
            { choice: "call", odds: 75 },
          ]);
        } else if (firstRoundPower === 2) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 10 },
            { choice: "call", odds: 80 },
          ]);
        } else if (firstRoundPower === 3) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 5 },
            { choice: "call", odds: 80 },
            { choice: "raise", odds: 15, amountToRaise: 10 },
          ]);
        } else if (firstRoundPower === 4) {
          // small amount to raise function
          return choiceBasedOnOdds([
            { choice: "fold", odds: 5 },
            { choice: "call", odds: 70 },
            { choice: "raise", odds: 25, amountToRaise: 10 },
          ]);
        } else if (firstRoundPower === 5) {
          // small amount to raise function
          // mid amount to raise function

          return choiceBasedOnOdds([
            { choice: "call", odds: 30 },
            { choice: "raise", odds: 30, amountToRaise: 10 },
            { choice: "raise", odds: 40, amountToRaise: 30 },
          ]);
        }
      }

      if (amountToCall <= 70 && amountToCall > 35) {
        if (firstRoundPower === 1) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 55 },
            { choice: "call", odds: 45 },
          ]);
        } else if (firstRoundPower === 2) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 35 },
            { choice: "call", odds: 65 },
          ]);
        } else if (firstRoundPower === 3) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 20 },
            { choice: "call", odds: 65 },
            { choice: "raise", odds: 15, amountToRaise: 10 },
          ]);
        } else if (firstRoundPower === 4) {
          // small amount to raise function
          return choiceBasedOnOdds([
            { choice: "fold", odds: 5 },
            { choice: "call", odds: 80 },
            { choice: "raise", odds: 25, amountToRaise: 10 },
          ]);
        } else if (firstRoundPower === 5) {
          // small amount to raise function
          // mid amount to raise function

          return choiceBasedOnOdds([
            { choice: "call", odds: 30 },
            { choice: "raise", odds: 30, amountToRaise: 10 },
            { choice: "raise", odds: 40, amountToRaise: 30 },
          ]);
        }
      }

      if (amountToCall > 70) {
        if (firstRoundPower === 1) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 70 },
            { choice: "call", odds: 30 },
          ]);
        } else if (firstRoundPower === 2) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 60 },
            { choice: "call", odds: 40 },
          ]);
        } else if (firstRoundPower === 3) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 25 },
            { choice: "call", odds: 65 },
            { choice: "raise", odds: 10, amountToRaise: 10 },
          ]);
        } else if (firstRoundPower === 4) {
          // small amount to raise function
          return choiceBasedOnOdds([
            { choice: "fold", odds: 20 },
            { choice: "call", odds: 60 },
            { choice: "raise", odds: 10, amountToRaise: 10 },
          ]);
        } else if (firstRoundPower === 5) {
          // small amount to raise function
          // mid amount to raise function

          return choiceBasedOnOdds([
            { choice: "call", odds: 80 },
            { choice: "raise", odds: 10, amountToRaise: 10 },
            { choice: "raise", odds: 10, amountToRaise: 30 },
          ]);
        }
      }
    }

    if (firstRoundPower === 1) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 90 },
        { choice: "raise", odds: 10, amountToRaise: 10 },
      ]);
    } else if (firstRoundPower === 2) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 85 },
        { choice: "raise", odds: 15, amountToRaise: 10 },
      ]);
    } else if (firstRoundPower === 3) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 85 },
        { choice: "raise", odds: 15, amountToRaise: 10 },
      ]);
    } else if (firstRoundPower === 4) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 85 },
        { choice: "raise", odds: 5, amountToRaise: 30 },
        { choice: "raise", odds: 10, amountToRaise: 10 },
      ]);
    } else if (firstRoundPower === 5) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 80 },
        { choice: "raise", odds: 10, amountToRaise: 30 },
        { choice: "raise", odds: 10, amountToRaise: 10 },
      ]);
    }
  }

  if (round >= 2) {
    if (amountToCall > 0) {
      if (amountToCall <= 35 && amountToCall >= 15) {
        if (power === 1) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 25 },
            { choice: "call", odds: 75 },
          ]);
        } else if (power === 2) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 15 },
            { choice: "call", odds: 85 },
          ]);
        } else if (power === 3) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 5 },
            { choice: "call", odds: 85 },
            { choice: "raise", odds: 10, amountToRaise: 10 },
          ]);
        } else if (power >= 4) {
          // small amount to raise function
          return choiceBasedOnOdds([
            { choice: "call", odds: 70 },
            { choice: "raise", odds: 15, amountToRaise: 10 },
            { choice: "raise", odds: 15, amountToRaise: 30 },
          ]);
        } else if (power >= 6) {
          // small amount to raise function
          // mid amount to raise function

          return choiceBasedOnOdds([
            { choice: "call", odds: 70 },
            { choice: "raise", odds: 15, amountToRaise: 10 },
            { choice: "raise", odds: 15, amountToRaise: 30 },
          ]);
        }
      }

      if (amountToCall <= 70 && amountToCall > 35) {
        if (power === 1) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 40 },
            { choice: "call", odds: 60 },
          ]);
        } else if (power === 2) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 25 },
            { choice: "call", odds: 75 },
          ]);
        } else if (power === 3) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 15 },
            { choice: "call", odds: 80 },
            { choice: "raise", odds: 5, amountToRaise: 10 },
          ]);
        } else if (power >= 4) {
          // small amount to raise function
          return choiceBasedOnOdds([
            { choice: "fold", odds: 10 },
            { choice: "call", odds: 80 },
            { choice: "raise", odds: 5, amountToRaise: 10 },
            { choice: "raise", odds: 5, amountToRaise: 30 },
          ]);
        } else if (power >= 6) {
          // small amount to raise function
          // mid amount to raise function

          return choiceBasedOnOdds([
            { choice: "call", odds: 60 },
            { choice: "raise", odds: 20, amountToRaise: 10 },
            { choice: "raise", odds: 20, amountToRaise: 30 },
          ]);
        }
      }

      if (amountToCall > 70) {
        if (power === 1) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 60 },
            { choice: "call", odds: 40 },
          ]);
        } else if (power === 2) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 40 },
            { choice: "call", odds: 60 },
          ]);
        } else if (power === 3) {
          return choiceBasedOnOdds([
            { choice: "fold", odds: 30 },
            { choice: "call", odds: 70 },
          ]);
        } else if (power >= 4) {
          // small amount to raise function
          return choiceBasedOnOdds([
            { choice: "fold", odds: 15 },
            { choice: "call", odds: 70 },
            { choice: "raise", odds: 10, amountToRaise: 10 },
            { choice: "raise", odds: 5, amountToRaise: 30 },
          ]);
        } else if (power >= 6) {
          // small amount to raise function
          // mid amount to raise function

          return choiceBasedOnOdds([
            { choice: "call", odds: 80 },
            { choice: "raise", odds: 10, amountToRaise: 10 },
            { choice: "raise", odds: 10, amountToRaise: 30 },
          ]);
        }
      }
    }

    if (power === 1) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 80 },
        { choice: "raise", odds: 15, amountToRaise: 10 },
        { choice: "raise", odds: 5, amountToRaise: 40 },
      ]);
    } else if (power === 2) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 75 },
        { choice: "raise", odds: 25, amountToRaise: 10 },
      ]);
    } else if (power === 3) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 65 },
        { choice: "raise", odds: 25, amountToRaise: 10 },
        { choice: "raise", odds: 10, amountToRaise: 30 },
      ]);
    } else if (power >= 4) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 40 },
        { choice: "raise", odds: 30, amountToRaise: 10 },
        { choice: "raise", odds: 30, amountToRaise: 30 },
      ]);
    } else if (power >= 6) {
      return choiceBasedOnOdds([
        { choice: "call", odds: 25 },
        { choice: "raise", odds: 25, amountToRaise: 10 },
        { choice: "raise", odds: 50, amountToRaise: 30 },
      ]);
    }
  }

  return { choice: "call" };
};

export default makeChoice;
