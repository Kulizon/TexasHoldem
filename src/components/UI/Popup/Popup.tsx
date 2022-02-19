import { useDispatch } from "react-redux";
import { pokerActions } from "../../../store/poker";

import Button from "../Button/Button";

import styles from "./Popup.module.scss";

const Popup = (props: { heading: string; text: string; imageUrl: string; imageAlt: string; didPlayerWin: boolean }) => {
  const disptach = useDispatch();

  const restartHandler = () => {
    disptach(pokerActions.restartGame());
  };

  return (
    <div className={styles.popup + " " + (props.didPlayerWin ? styles.win : styles.lost)}>
      <img src={props.imageUrl} alt={props.imageAlt} />
      <h1>{props.heading}</h1>
      <p>{props.text}</p>
      <Button text="Restart" onClick={restartHandler}></Button>
    </div>
  );
};

export default Popup;
