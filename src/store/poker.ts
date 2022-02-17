import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../interfaces/Card";
import { Player } from "../interfaces/Player";
import allCards from "./../assets/allCards";
import { CalculatedHand } from "./../utilities/checkWinner";
import generateHand from "./../utilities/generating/generateHand";

type PokerState = {
  round: number;
  pot: number;
  currentPlayers: Player[];
  losers: Player[];
  folded: string[];
  isGameStarted: boolean;
  isGameFinished: boolean;
  isPlayerTurn: boolean;
  currentTurn: number;
  lastBigBlind: number;
  firstPlayerNumber: number;
  maxBet: number;
  usedCards: Card[];
  cards: Card[];
  deck: Card[];
  winners: CalculatedHand[];
};

const pokerInitialState: PokerState = {
  round: 1,
  pot: 30,
  currentPlayers: [],
  losers: [],
  folded: [],
  isGameStarted: true,
  isPlayerTurn: false,
  isGameFinished: false,
  currentTurn: 4,
  firstPlayerNumber: 4,
  lastBigBlind: 3,
  maxBet: 20,
  usedCards: [],
  cards: [...allCards],
  deck: [],
  winners: [],
};

const setNextTurn = (turn: number, amountOfPlayers: number) => {
  if (turn === amountOfPlayers) {
    return 1;
  } else {
    return (turn += 1);
  }
};

export const getBlinds = (lastBigBlind: number, amountOfPlayers: number): { smallBlind: number; bigBlind: number } => {
  if (lastBigBlind === amountOfPlayers) {
    return { smallBlind: amountOfPlayers, bigBlind: 1 };
  } else if (lastBigBlind === 1) {
    return { smallBlind: 1, bigBlind: 2 };
  } else {
    return { smallBlind: lastBigBlind, bigBlind: lastBigBlind + 1 };
  }
};

const setBlinds = (state: PokerState, smallBlind: number, bigBlind: number): { usedCards: Card[] } => {
  let usedCards: Card[] = [];

  state.currentPlayers.forEach((p) => {
    if (p.order === bigBlind) {
      if (p.balance - 20 < 0) {
        state.losers.push(p);
        state.currentPlayers = state.currentPlayers.filter((player) => player.id !== p.id);
      }

      p.blind = "big";
      p.currentBet = 20;
      p.entireBet += 20;
      p.balance -= 20;
      state.maxBet = 20;
      state.pot += 20;
    } else if (p.order === smallBlind) {
      if (p.balance - 10 < 0) {
        state.losers.push(p);
        state.currentPlayers = state.currentPlayers.filter((player) => player.id !== p.id);
      }

      p.blind = "small";
      p.currentBet = 10;
      p.entireBet += 10;
      p.balance -= 10;
      state.pot += 10;
    } else {
      p.blind = "none";
    }

    const hand = generateHand(state.cards, usedCards);
    usedCards = [...usedCards, ...hand];
    p.hand = hand;
  });

  return { usedCards: usedCards };
};

const clearBets = (state: PokerState) => {
  state.maxBet = 0;
  state.round += 1;

  if (state.folded.length === state.currentPlayers.length - 1) state.round = 5;

  state.currentPlayers.forEach((p) => {
    p.currentBet = 0;
  });
};

const poker = createSlice({
  name: "poker",
  initialState: pokerInitialState,
  reducers: {
    fold(state: PokerState, action: { payload: { playerType: "player" | "bot"; playerID: string } }) {
      const nextTurn = setNextTurn(state.currentTurn, state.currentPlayers.length);
      state.currentTurn = nextTurn;

      state.folded.push(action.payload.playerID);

      if (nextTurn === state.firstPlayerNumber) clearBets(state);
    },
    call(
      state: PokerState,
      action: { payload: { playerType: "player" | "bot"; playerID: string; amountToCall: number } }
    ) {
      const nextTurn = setNextTurn(state.currentTurn, state.currentPlayers.length);
      state.currentTurn = nextTurn;

      const player = state.currentPlayers.find((p) => p.id === action.payload.playerID);

      let amountToCall = action.payload.amountToCall;
      if (amountToCall > player!.balance) amountToCall = player!.balance;

      player!.balance -= amountToCall;

      player!.currentBet = amountToCall;
      player!.entireBet += amountToCall;
      state.pot += amountToCall;

      if (nextTurn === state.firstPlayerNumber) clearBets(state);
    },
    raise(
      state: PokerState,
      action: {
        payload: { playerType: "player" | "bot"; playerID: string; amountToRaise: number; amountToCall: number };
      }
    ) {
      const nextTurn = setNextTurn(state.currentTurn, state.currentPlayers.length);
      state.currentTurn = nextTurn;

      const player = state.currentPlayers.find((p) => p.id === action.payload.playerID);

      let raiseAmount = action.payload.amountToCall + action.payload.amountToRaise;
      if (raiseAmount > player!.balance) raiseAmount = player!.balance;

      player!.balance -= raiseAmount;
      player!.currentBet += raiseAmount;
      player!.entireBet += raiseAmount;

      state.pot += raiseAmount;

      state.maxBet = raiseAmount > state.maxBet ? raiseAmount : state.maxBet;

      state.firstPlayerNumber = player!.order;

      if (nextTurn === state.firstPlayerNumber) clearBets(state);
    },
    setPlayers(state: PokerState, action: { payload: Player[] }) {
      state.currentPlayers = action.payload;
    },
    addUsedCards(state: PokerState, action: { payload: Card[] }) {
      state.usedCards = [...state.usedCards, ...action.payload];
    },
    addToDeck(state: PokerState, action: { payload: Card }) {
      state.deck.push(action.payload);
    },
    nextTurn(state) {
      const nextTurn = setNextTurn(state.currentTurn, state.currentPlayers.length);
      state.currentTurn = nextTurn;

      if (nextTurn === state.firstPlayerNumber) clearBets(state);
    },
    setIsPlayerTurn(state, action: { payload: boolean }) {
      state.isPlayerTurn = action.payload;
    },
    startRound(state) {
      state.isGameStarted = true;
      state.round = 1;
      state.folded = [];
      state.winners = [];
      state.deck = [];
      state.usedCards = [];

      const prevLength = state.currentPlayers.length;

      state.losers = state.currentPlayers.filter((p) => p.balance <= 0);
      state.currentPlayers = state.currentPlayers.filter((p) => p.balance > 0);

      const { smallBlind, bigBlind } = getBlinds(state.lastBigBlind, state.currentPlayers.length);
      let { usedCards } = setBlinds(state, smallBlind, bigBlind);

      if (prevLength > state.currentPlayers.length) {
        state.currentPlayers.forEach((p, index) => (p.order = index + 1));

        const lastBigBlind =
          state.lastBigBlind > state.currentPlayers.length ? state.currentPlayers.length : state.lastBigBlind;

        const { smallBlind: newSmallBlind, bigBlind: newBigBlind } = getBlinds(
          lastBigBlind,
          state.currentPlayers.length
        );

        usedCards = setBlinds(state, newSmallBlind, newBigBlind).usedCards;
      }

      state.lastBigBlind = bigBlind;
      state.usedCards = usedCards;

      const firstTurn = setNextTurn(bigBlind, state.currentPlayers.length);
      state.currentTurn = firstTurn;
      state.firstPlayerNumber = firstTurn;

      state.isPlayerTurn = false;
      if (firstTurn === state.currentPlayers.length) state.isPlayerTurn = true;

      if (state.currentPlayers.length === 1) {
        if (state.currentPlayers[0].id === "p1") state.isGameFinished = true;
      } else {
        state.losers.forEach((l) => {
          if (l.id === "p1") state.isGameFinished = true;
        });
      }
    },
    endRound(state, action: { payload: CalculatedHand[] }) {
      state.isGameStarted = false;
      state.winners = action.payload;

      const winnersIDs = action.payload.map((w) => w.playerID);

      state.currentPlayers.forEach((p) => {
        p.entireBet = 0;
        if (winnersIDs.includes(p.id)) p.balance += Math.floor(state.pot / winnersIDs.length);
      });

      state.pot = 0;
    },
  },
});

const pokerActions = poker.actions;

export default poker;
export { pokerActions, type PokerState };
