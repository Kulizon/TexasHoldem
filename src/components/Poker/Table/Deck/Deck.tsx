import { useSelector, useDispatch } from "react-redux";
import { pokerActions, PokerState } from "../../../../store/poker";
import { useEffect } from "react";
import { Card } from "../../../../interfaces/Card";
import getRandomCard from "../../../../utilities/getRandomCard";
import checkWinner from "../../../../utilities/checkWinner";
import { CalculatedHand } from "../../../../utilities/checkWinner";

import styles from "./Deck.module.scss";

const Deck = () => {
  const dispatch = useDispatch();
  const { round, cards, deck, usedCards, currentPlayers, folded } = useSelector(
    (state: { poker: PokerState }) => state.poker
  );

  const addCard = () => {
    const card = getRandomCard(cards, usedCards);
    dispatch(pokerActions.addToDeck(card));
    dispatch(pokerActions.addUsedCards([card]));
  };

  useEffect(() => {
    if (round === 2) {
      let notAvailableCards: Card[] = [...usedCards];

      for (let i = 0; i < 3; i++) {
        const card = getRandomCard(cards, notAvailableCards);
        notAvailableCards = [...notAvailableCards, card];
        dispatch(pokerActions.addToDeck(card));
      }

      dispatch(pokerActions.addUsedCards(notAvailableCards));
    } else if (round === 3) {
      addCard();
    } else if (round === 4) {
      addCard();
    } else if (round === 5) {
      console.log("Checking winner");

      const hands = currentPlayers.map((p) => {
        return { playerID: p.id, hand: [...p.hand, ...deck] };
      });

      const winners: CalculatedHand[] = checkWinner(
        hands.filter((h) => !folded.includes(h.playerID)),
        folded
      );

      dispatch(pokerActions.endRound(winners));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  return (
    <div className={styles.deck}>
      {deck.map((c) => {
        return <img src={`${process.env.PUBLIC_URL}/cards/${c.id}.png`} alt={c.id} key={c.id}></img>;
      })}
    </div>
  );
};

export default Deck;
