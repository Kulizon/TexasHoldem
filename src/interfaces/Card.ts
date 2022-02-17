export type CardValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
export type Color = "s" | "h" | "d" | "c";

export interface Card {
  value: CardValue;
  color: Color;
  id: string;
}
