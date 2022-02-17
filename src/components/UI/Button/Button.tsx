import styles from "./Button.module.scss";

const Button = (props: {
  text: string;
  id?: string;
  onClick?: (e: any) => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className={styles.button + " " + props.className}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
