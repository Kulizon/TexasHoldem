import Button from "../Button/Button";

import styles from "./Popup.module.scss";

const Popup = (props: { heading: string; text: string; imageUrl: string; imageAlt: string; didPlayerWin: boolean }) => {
  const restartHandler = () => {
    // reload page
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
