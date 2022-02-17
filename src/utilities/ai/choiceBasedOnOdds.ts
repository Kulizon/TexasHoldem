interface ChoiceWithOdds {
  choice: "raise" | "call" | "fold";
  odds: number;
  amountToRaise?: number;
}

export const choiceBasedOnOdds = (
  choices: ChoiceWithOdds[]
): { choice: "raise"; amountToRaise: number } | { choice: "call" } | { choice: "fold" } => {
  const sortedChoices: ChoiceWithOdds[] = [...choices];

  for (let i = 0; i < sortedChoices.length; i++) {
    for (let n = 0; n < sortedChoices.length - 1; n++) {
      if (sortedChoices[n].odds > sortedChoices[n + 1].odds) {
        const h = sortedChoices[n];
        sortedChoices[n] = sortedChoices[n + 1];
        sortedChoices[n + 1] = h;
      }
    }
  }

  let choice: { choice: "raise"; amountToRaise: number } | { choice: "call" } | { choice: "fold" } | null = null;

  while (!choice) {
    for (let i = 0; i < sortedChoices.length; i++) {
      const c = sortedChoices[i];
      const randomPercentage = Math.random() * 100 + 1;
      if (c.odds >= randomPercentage) {
        if (c.choice === "raise") choice = { choice: c.choice, amountToRaise: c.amountToRaise! };
        else choice = { choice: c.choice };
      }
    }
  }

  return choice;
};
