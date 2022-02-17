import { useState } from "react";

import Main from "./pages/Main/Main";
import Poker from "./pages/Poker/Poker";

import "./App.css";

const App = () => {
  const [isPlaying] = useState(true);

  return <div className="app">{isPlaying ? <Poker></Poker> : <Main></Main>}</div>;
};

export default App;
