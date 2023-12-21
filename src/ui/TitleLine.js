import classes from "./TitleLine.module.css";

function TitleLine({ children }) {
  return (
    <div className={classes.title}>
      <div className={classes.line} />
      <div>{children}</div>
      <div className={classes.line} />
    </div>
  );
}

export default TitleLine;
