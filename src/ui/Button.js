import classes from "./Button.module.css";

function Button({ children, onClick, color, size, disabled }) {
  const colorClass =
    color === "red"
      ? classes.red
      : color === "green"
      ? classes.green
      : color === "blue"
      ? classes.blue
      : color === "yellow"
      ? classes.yellow
      : classes.gray;

  const sizeClass =
    size === "small"
      ? classes.small
      : size === "big"
      ? classes.big
      : classes.medium;

  return (
    <button
      disabled={disabled ? true : false}
      onClick={disabled ? () => {} : onClick}
      className={`${classes.button} ${colorClass} ${sizeClass}`}
    >
      {children}
    </button>
  );
}

export default Button;
