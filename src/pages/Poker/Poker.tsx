import { useSelector, useDispatch } from "react-redux";
import { PokerState } from "../../store/poker";
import { MainState } from "../../store/main";
import { pokerActions } from "../../store/poker";
import { useEffect, useState } from "react";
import generateBots from "../../utilities/generating/generateBots";
import { Player } from "../../interfaces/Player";
import { Card } from "../../interfaces/Card";
import { getBlinds } from "../../store/poker";
import generateHand from "../../utilities/generating/generateHand";

import Table from "../../components/Poker/Table/Table";
import PokerMenu from "../../components/Poker/PokerMenu/PokerMenu";
import Popup from "../../components/UI/Popup/Popup";

import styles from "./Poker.module.scss";

const Poker = () => {
  const dispatch = useDispatch();
  const { lastBigBlind, cards, isGameFinished, currentPlayers } = useSelector(
    (state: { poker: PokerState }) => state.poker
  );
  const { amountOfPlayers, playerName, initialBalance } = useSelector((state: { main: MainState }) => state.main);

  const [popupInfo, setPopupInfo] = useState({
    heading: "",
    text: "",
    imageUrl: "",
    imageAlt: "",
    didPlayerWin: false,
  });

  useEffect(() => {
    if (isGameFinished === true) {
      const user = currentPlayers.find((p) => p.id === "p1");

      if (!user)
        setPopupInfo({
          heading: "You won!",
          text: "Congratulations! You managed to defeat all of your opponents. Would you like to try again?",
          imageUrl: "assets/crown.svg",
          imageAlt: "Crown",
          didPlayerWin: true,
        });
      else
        setPopupInfo({
          heading: "You lost!",
          text: "What a shame! You have unfortunately been eliminated. Would you like to try again?",
          imageUrl: "assets/crown.svg",
          imageAlt: "Crown",
          didPlayerWin: false,
        });
    }
  }, [isGameFinished, currentPlayers]);

  useEffect(() => {
    const blinds = getBlinds(lastBigBlind - 1, amountOfPlayers);

    const result = generateBots(amountOfPlayers - 1, blinds, cards, initialBalance);
    const players: Player[] = result.bots;
    let usedCards: Card[] = result.usedCards;

    const hand = generateHand(cards, usedCards);
    usedCards = [...usedCards, ...hand];

    const user: Player = {
      id: "p1",
      order: 1,
      name: playerName,
      balance: initialBalance,
      type: "player",
      currentBet: 0,
      entireBet: 0,
      blind: "none",
      hand: hand,
    };

    players.unshift(user);
    dispatch(pokerActions.setPlayers(players));
    dispatch(pokerActions.addUsedCards(usedCards));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <main className={styles["poker-main"]}>
      {popupInfo.heading ? (
        <Popup
          heading={popupInfo.heading}
          imageUrl={popupInfo.imageUrl}
          imageAlt={popupInfo.imageAlt}
          text={popupInfo.text}
          didPlayerWin={popupInfo.didPlayerWin}
        ></Popup>
      ) : (
        <>
          <Table></Table>
          <PokerMenu></PokerMenu>
        </>
      )}
    </main>
  );
};

export default Poker;
