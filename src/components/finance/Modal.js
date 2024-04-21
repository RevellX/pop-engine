import classes from "./Modal.module.css";

function Modal({ dialogRef, data }) {
  return (
    <dialog className={classes.dialog} ref={dialogRef}>
      {data && data.mode}
    </dialog>
  );
}

export default Modal;
