import { Card } from "./Card";

export interface Player {
  id: string;
  order: number;
  name: string;
  balance: number;
  type: "player" | "bot";
  currentBet: number;
  entireBet: number;
  blind: "big" | "small" | "none";
  hand: Card[];
}
