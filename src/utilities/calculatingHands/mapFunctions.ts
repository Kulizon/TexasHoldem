export interface ColorsMap {
  s: number;
  h: number;
  d: number;
  c: number;
}

export interface ValuesMap {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
}

export const mapColors = (colors: string[]) => {
  const map = { s: 0, h: 0, d: 0, c: 0 };

  colors.forEach((c) => {
    map[c as keyof ColorsMap] += 1;
  });

  return map;
};

export const mapValues = (values: string[]) => {
  const map = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "11": 0,
    "12": 0,
    "13": 0,
    "14": 0,
  };

  values.forEach((c) => {
    map[+c as keyof ValuesMap] += 1;
  });

  return map;
};
