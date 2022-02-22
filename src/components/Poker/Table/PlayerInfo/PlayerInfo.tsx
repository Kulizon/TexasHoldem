import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pokerActions } from "../../../../store/poker";
import makeChoice from "../../../../utilities/ai/makeChoice";
import { PokerState } from "../../../../store/poker";
import { MainState } from "../../../../store/main";
import { Card } from "../../../../interfaces/Card";
import { CalculatedHand } from "../../../../interfaces/CalculatedHand";

import styles from "./PlayerInfo.module.scss";

const PlayerInfo = (props: {
  id: string;
  name: string;
  balance: number;
  type: "player" | "bot";
  order: number;
  currentBet: number;
  hand: Card[];
  folded: boolean;
  winners: CalculatedHand[];
  blind: "big" | "small" | "none";
}) => {
  const dispatch = useDispatch();
  const { maxBet, currentTurn, folded, isGameStarted, deck, isPlayerTurn, round } = useSelector(
    (state: { poker: PokerState }) => state.poker
  );

  const { speed } = useSelector((state: { main: MainState }) => state.main);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isGameStarted) return;

      if (folded.includes(props.id) && props.order === currentTurn) dispatch(pokerActions.nextTurn());
      if (folded.includes(props.id)) return;

      if (props.balance === 0 && props.currentBet > 0 && props.order === currentTurn) dispatch(pokerActions.nextTurn());
      if (props.balance === 0 && props.currentBet === 0 && props.order === currentTurn)
        dispatch(pokerActions.nextTurn());

      if (props.type === "player" && props.order === currentTurn) dispatch(pokerActions.setIsPlayerTurn(true));

      if (props.type === "bot" && isPlayerTurn !== true && props.order === currentTurn) {
        console.log(`This is ${props.name} turn.`);

        const amountToCall = maxBet - props.currentBet;
        const choice = makeChoice(props.id, round, amountToCall, props.hand, deck);

        if (choice.choice === "fold") {
          dispatch(pokerActions.fold({ playerType: "bot", playerID: props.id }));
        } else if (choice.choice === "call") {
          dispatch(pokerActions.call({ playerType: "bot", playerID: props.id, amountToCall: amountToCall }));
        } else if (choice.choice === "raise") {
          dispatch(
            pokerActions.raise({
              playerType: "bot",
              playerID: props.id,
              amountToCall: amountToCall,
              amountToRaise: choice.amountToRaise,
            })
          );
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [
    dispatch,
    currentTurn,
    props.name,
    props.order,
    props.type,
    props.id,
    props.currentBet,
    maxBet,
    props.hand,
    folded,
    isGameStarted,
    deck,
    isPlayerTurn,
    round,
    props.balance,
    speed,
  ]);

  const getCard = (index: number, showCard: boolean) => {
    if (props.id !== "p1" && !showCard) return "back.svg";
    if (props.hand[index]) return props.hand[index].id + ".png";
    else return "back.svg";
  };

  let isWinner = false;
  let winnerHand = "";
  const winner = props.winners.find((w) => w.playerID === props.id);
  if (winner) {
    isWinner = true;
    const words = winner.handName.split("-");
    winnerHand = words.map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
  }

  return (
    <div className={styles.player + " " + (props.folded ? styles.folded : " ")}>
      <div className={styles.info}>
        {isWinner && <img src={`${process.env.PUBLIC_URL}/assets/crown.svg`} alt="Winning Crown"></img>}
        <h2>{props.name}</h2>
        <h3>${props.balance}</h3>
      </div>

      <div className={styles.cards}>
        <img
          src={`${process.env.PUBLIC_URL}/cards/${getCard(0, !isGameStarted)}`}
          alt={getCard(0, !isGameStarted)}
        ></img>
        <img
          src={`${process.env.PUBLIC_URL}/cards/${getCard(1, !isGameStarted)}`}
          alt={getCard(1, !isGameStarted)}
        ></img>
      </div>

      {winnerHand ? (
        <p className={styles["winning-hand"]}>{winnerHand}</p>
      ) : props.blind !== "none" && isGameStarted ? (
        <p className={styles["blind"]}>{props.blind[0].toUpperCase() + props.blind.slice(1) + " Blind"}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default PlayerInfo;
