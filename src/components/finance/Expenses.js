import { useContext, useState } from "react";
import Button from "./Button";
import classes from "./Expenses.module.css";
import UserContext from "../../store/authUserContext";

function Expenses({ isLoading, expenses }) {
  const ctx = useContext(UserContext);
  const [userId] = useState(ctx.getUser().id);
  return (
    <div
      className={`${classes.expenses} ${
        isLoading ? classes.loading : ""
      }`}
    >
      <h4>Wydatki</h4>
      {expenses &&
        expenses.map((expense) => (
          <div key={expense.id}>
            {expense.title} {expense.amount.toFixed(2)} zł
            {expense.user.id === userId && <Button>X</Button>}
          </div>
        ))}
      {expenses.length === 0 && <div>Brak wydatków w tej grupie</div>}
    </div>
  );
}

export default Expenses;
