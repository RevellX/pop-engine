import Button from "./Button";
import Card from "./Card";
import classes from "./Modal.module.css";

function Modal({
  title,
  content,
  onYes,
  onNo,
  onClose,
  yesButton,
  noButton,
}) {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose} />
      <Card className={classes.dialog}>
        <h2>{title}</h2>
        <h4>{content}</h4>
        <div>
          <Button color={"green"} size={"big"} onClick={onYes}>
            {yesButton}
          </Button>
          <Button color={"red"} size={"big"} onClick={onNo}>
            {noButton}
          </Button>
        </div>
      </Card>
    </>
  );
}

export default Modal;
