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

import Table from "./Table/Table";
import PokerMenu from "./PokerMenu/PokerMenu";
import Options from "../Options/Options";
import Popup from "../UI/Popup/Popup";

import styles from "./Poker.module.scss";

// import { isStraightFlush } from "../../utilities/calculatingHands/handsFunctions";
// console.log(
//   isStraightFlush(
//     { s: 0, h: 1, d: 0, c: 6 },
//     {
//       "1": 0,
//       "2": 0,
//       "3": 0,
//       "4": 0,
//       "5": 0,
//       "6": 0,
//       "7": 0,
//       "8": 0,
//       "9": 0,
//       "10": 0,
//       "11": 0,
//       "12": 0,
//       "13": 0,
//       "14": 0,
//     },
//     [
//       { value: 4, color: "h", id: "5c" },
//       { value: 5, color: "c", id: "5c" },
//       { value: 6, color: "c", id: "4c" },
//       { value: 7, color: "c", id: "5c" },
//       { value: 8, color: "c", id: "5c" },
//       { value: 9, color: "c", id: "5c" },
//       { value: 14, color: "c", id: "5c" },
//     ]
//   )
// );

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

      if (user)
        setPopupInfo({
          heading: "You won!",
          text: "Congratulations! You have managed to defeat all of your opponents. Would you like to try again?",
          imageUrl: `${process.env.PUBLIC_URL}/assets/crown.svg`,
          imageAlt: "Crown",
          didPlayerWin: true,
        });
      else
        setPopupInfo({
          heading: "You lost!",
          text: "What a shame! You have unfortunately been eliminated. Would you like to try again?",
          imageUrl: `${process.env.PUBLIC_URL}/assets/broken-heart.svg`,
          imageAlt: "Crown",
          didPlayerWin: false,
        });
    }
  }, [isGameFinished, currentPlayers]);

  useEffect(() => {
    if (currentPlayers.length !== 0) return;
    setPopupInfo({
      heading: "",
      text: "",
      imageUrl: "",
      imageAlt: "",
      didPlayerWin: false,
    });

    const blinds = getBlinds(lastBigBlind - 2, amountOfPlayers);

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
  }, [dispatch, currentPlayers, isGameFinished]);

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
          <Options></Options>
        </>
      )}
    </main>
  );
};

export default Poker;
