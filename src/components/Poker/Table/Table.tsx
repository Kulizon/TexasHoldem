import { useSelector } from "react-redux";
import { PokerState } from "../../../store/poker";

import Deck from "./Deck/Deck";
import PlayerInfo from "./PlayerInfo/PlayerInfo";

import styles from "./Table.module.scss";

const Table = () => {
  const { folded, currentPlayers, winners } = useSelector((state: { poker: PokerState }) => state.poker);

  console.log(currentPlayers);

  return (
    <div className={styles.table}>
      <div className={styles.line}></div>
      <div className={styles.line + " " + styles["inner-line"]}></div>
      <div className={styles.players}>
        {currentPlayers.map((p) => (
          <PlayerInfo
            key={p.id}
            id={p.id}
            name={p.name}
            balance={p.balance}
            type={p.type}
            order={p.order}
            currentBet={p.currentBet}
            hand={p.hand}
            folded={folded.includes(p.id)}
            winners={winners}
            blind={p.blind}
          ></PlayerInfo>
        ))}
      </div>
      <Deck></Deck>
    </div>
  );
};

export default Table;
