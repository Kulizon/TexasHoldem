import { Card } from "../interfaces/Card";
import { checkHand } from "./checkHand";

export interface CalculatedHand {
  playerID: string;
  handName: string;
  power: number;
  maxHandPower: number;
  highCard: number;
}

const getWinnerOrEqualPlayers = (players: CalculatedHand[], criterium: "power" | "maxHandPower" | "highCard") => {
  let highestPowerPlayer = players[0];
  const samePowerPlayers: CalculatedHand[] = [];

  players.forEach((p) => {
    if (p[criterium] > highestPowerPlayer[criterium]) highestPowerPlayer = p;
  });

  players.forEach((p) => {
    if (p[criterium] === highestPowerPlayer[criterium] && p.playerID !== highestPowerPlayer.playerID) {
      if (samePowerPlayers.length === 0) {
        samePowerPlayers.push(highestPowerPlayer);
        samePowerPlayers.push(p);
      } else {
        samePowerPlayers.push(p);
      }
    }
  });

  return { highestPowerPlayer, samePowerPlayers };
};

const checkWinner = (hands: { playerID: string; hand: Card[] }[], folded: string[]) => {
  const calculatedHands: CalculatedHand[] = [];

  hands.forEach((h) => {
    if (h.playerID in folded) return;
    

    const calculatedHand = checkHand(h);

    calculatedHands.push(calculatedHand);
  });

  console.log(hands);
  console.log(calculatedHands);

  let winners: CalculatedHand[] = [];

  const { highestPowerPlayer, samePowerPlayers } = getWinnerOrEqualPlayers(calculatedHands, "power");

  if (samePowerPlayers.length > 0) {
    const { highestPowerPlayer: maxHandPowerPlayer, samePowerPlayers: sameMaxHandPlayers } = getWinnerOrEqualPlayers(
      samePowerPlayers,
      "maxHandPower"
    );

    if (sameMaxHandPlayers.length > 1) {
      const { highestPowerPlayer: highestCardPlayer, samePowerPlayers: sameHighestCardPlayers } =
        getWinnerOrEqualPlayers(sameMaxHandPlayers, "highCard");

      if (sameHighestCardPlayers.length > 1) {
        winners = [...sameHighestCardPlayers];
      } else {
        winners = [highestCardPlayer];
      }
    } else {
      winners = [maxHandPowerPlayer];
    }
  } else {
    winners = [highestPowerPlayer];
  }

  return winners;
};

export default checkWinner;
