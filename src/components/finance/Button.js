import classes from "./Button.module.css";

function Button({ className, children, onClick, disabled }) {
  return (
    <button
      className={`${className} ${classes.button}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
