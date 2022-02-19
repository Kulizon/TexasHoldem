import { createSlice } from "@reduxjs/toolkit";

type MainState = {
  playerName: string;
  amountOfPlayers: number;
  initialBalance: number;
  speed: number;
};

const mainInitialState: MainState = {
  playerName: "User",
  amountOfPlayers: 8,
  initialBalance: 500,
  speed: 400,
};

const main = createSlice({
  name: "main",
  initialState: mainInitialState,
  reducers: {
    changeOptions(state, action: { payload: { amountOfPlayers: number; initialBalance: number; speed: number } }) {
      state.amountOfPlayers = action.payload.amountOfPlayers;
      state.initialBalance = action.payload.initialBalance;
      state.speed = action.payload.speed;
    },
  },
});

const mainActions = main.actions;

export default main;
export { mainActions, type MainState };
