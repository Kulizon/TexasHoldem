import { useSelector, useDispatch } from "react-redux";
import { PokerState } from "../../../store/poker";
import { pokerActions } from "../../../store/poker";
import { useEffect, useState, useRef } from "react";

import Button from "../../UI/Button/Button";

import styles from "./PokerMenu.module.scss";

const PokerMenu = () => {
  const dispatch = useDispatch();
  const { folded, maxBet, currentPlayers, isGameStarted, isPlayerTurn, pot } = useSelector(
    (state: { poker: PokerState }) => state.poker
  );

  const [amountToCall, setAmountToCall] = useState(0);
  const [isRaiseMenuOpen, setIsRaiseMenuOpen] = useState(false);
  const [raiseValue, setRaiseValue] = useState(5);
  const raiseInputRef = useRef<HTMLInputElement>(null);
  const user = currentPlayers.find((p) => p.id === "p1");

  useEffect(() => {
    if (user) setAmountToCall(maxBet - user!.currentBet);
  }, [maxBet, user]);

  const playerChoiceHandler = (e: any) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.id;

    if (action === "fold") {
      dispatch(pokerActions.fold({ playerType: "player", playerID: "p1" }));

      dispatch(pokerActions.setIsPlayerTurn(false));
    }

    if (action === "call") {
      dispatch(pokerActions.call({ playerType: "player", playerID: "p1", amountToCall: amountToCall }));

      dispatch(pokerActions.setIsPlayerTurn(false));
    }

    if (action === "raise") {
      if (isRaiseMenuOpen === true) return;

      const amountToRaise = raiseValue;
      setRaiseValue(5);

      if (amountToRaise + amountToCall > user!.balance) return;

      dispatch(
        pokerActions.raise({
          playerType: "player",
          playerID: "p1",
          amountToRaise: amountToRaise,
          amountToCall: amountToCall,
        })
      );

      dispatch(pokerActions.setIsPlayerTurn(false));
    }

    if (action === "start-round") {
      dispatch(pokerActions.startRound());
    }
  };

  return (
    <div className={styles["menu"]}>
      <p>
        Pot: <span>${pot}</span>
      </p>
      <form
        onSubmit={playerChoiceHandler}
        className={
          styles["menu-form"] +
          " " +
          (isPlayerTurn || !isGameStarted ? styles["player-turn"] : " ") +
          " " +
          (folded.includes("p1") && isGameStarted ? styles.folded : " ") +
          " " +
          (!isGameStarted ? styles["game-ended"] : " ")
        }
      >
        <div>
          <Button id="fold" text="Fold" className={styles.fold}></Button>
        </div>
        <div>
          <Button
            id="call"
            className={styles.call}
            text={amountToCall === 0 ? "Check" : `Call $${amountToCall}`}
          ></Button>
          {!isGameStarted && <Button id="start-round" text="Next Round" className={styles["next-round"]}></Button>}
          <div>
            <Button
              id="raise"
              text="Raise"
              className={styles.raise}
              onClick={
                !isRaiseMenuOpen
                  ? () => {
                      setIsRaiseMenuOpen(true);
                      raiseInputRef.current!.focus();
                    }
                  : () => {
                      setIsRaiseMenuOpen(false);
                    }
              }
            ></Button>
            <input
              type="number"
              min={5}
              step={5}
              value={raiseValue}
              id="amountToRaise"
              ref={raiseInputRef}
              onChange={(e: any) => {
                setRaiseValue(+e.target.value);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setIsRaiseMenuOpen(false);
                }, 150);
              }}
              style={isRaiseMenuOpen ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }}
            />
          </div>
        </div>
      </form>
      <p>
        Bet: <span>${user?.entireBet}</span>
      </p>
    </div>
  );
};

export default PokerMenu;
