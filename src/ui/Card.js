import classes from "./Card.module.css";

function Card({ children, className, style }) {
  return (
    <div
      style={style}
      className={`${classes.card} ${
        className ? className : undefined
      }`}
    >
      {children}
    </div>
  );
}

export default Card;
