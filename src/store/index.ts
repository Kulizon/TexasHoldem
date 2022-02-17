import { configureStore } from "@reduxjs/toolkit";

import poker from "./poker";
import main from "./main";

const store = configureStore({
  reducer: { poker: poker.reducer, main: main.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
