import classes from "./Alert.module.css";

function Alert({ children, variant }) {
  const stylingVariant =
    variant === "error"
      ? classes.error
      : variant === "success"
      ? classes.success
      : classes.info;

  return (
    <div className={`${classes.alert} ${stylingVariant}`}>
      {children}
    </div>
  );
}

export default Alert;
