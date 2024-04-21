import { useState } from "react";
import classes from "./Actions.module.css";
import Button from "./Button";
import { EXPENSES_ADD_URL } from "../../utils/config";
import { getAuthToken } from "../../utils/token";

function Actions({
  selectedGroup,
  isLoading,
  setIsLoading,
  refreshHandler,
  error,
  setError,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [amountInput, setAmountInput] = useState("");

  const toggleOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const checkInputsHandler = () => {
    if (
      typeof titleInput != "string" ||
      titleInput.length === 0 ||
      titleInput.length > 128
    ) {
      setError({ message: "Niepoprawna nazwa" });
      return false;
    }

    const parsedAmount = parseFloat(amountInput);
    if (
      typeof parsedAmount != "number" ||
      isNaN(parsedAmount) ||
      parsedAmount <= 0
    ) {
      setError({ message: "Niepoprawna kwota" });
      return false;
    }

    setError(null);
    return true;
  };

  const submitHandler = () => {
    if (checkInputsHandler()) {
      setIsLoading(true);
      fetch(EXPENSES_ADD_URL + selectedGroup, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + getAuthToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleInput,
          amount: parseFloat(amountInput),
          date: "2024-01-01",
        }),
      })
        .then((response) => {
          setError(null);
          if (!response.ok)
            throw new Error(
              "Adding new expense response status: " + response.status
            );
          else {
            setTitleInput("");
            setAmountInput("");
            toggleOpenHandler();
            refreshHandler();
          }
        })
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className={classes.actions}>
      <div className={classes.buttons}>
        <Button disabled={isLoading} onClick={refreshHandler}>
          Refresh
        </Button>
        <Button disabled={isLoading} onClick={toggleOpenHandler}>
          New Expense
        </Button>
      </div>

      <div
        className={`${classes.form} ${
          isOpen ? classes.open : undefined
        }`}
      >
        <div>
          <input
            placeholder='Nazwa'
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <button onClick={() => setTitleInput("")}>X</button>
        </div>
        <div>
          <input
            placeholder='Kwota'
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
          <button onClick={() => setAmountInput("")}>X</button>
        </div>
        <Button onClick={submitHandler}>Dodaj</Button>
      </div>

      <div className={classes.result}>
        {!error && (
          <div>{isLoading ? "Fetching data..." : "Ready"}</div>
        )}
        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
}

export default Actions;
