import classes from "./Toggle.module.css";
import { useSubmit } from "react-router-dom";
import { POP_GET_USERS, POP_TOGGLE_URL } from "../../utils/config";
import { useEffect, useState } from "react";
import { getAuthToken } from "../../utils/token";
import MainCenter from "../../ui/main/MainCenter";
import Button from "../finance/Button";

function TogglePage() {
  const submit = useSubmit();
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(POP_GET_USERS, {
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then((response) => {
        setError(null);
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [refresh]);

  const toggleUser = (user_id) => {
    setIsLoading(true);
    fetch(POP_TOGGLE_URL + "/" + user_id, {
      method: "PATCH",
      headers: { Authorization: "Bearer " + getAuthToken() },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
      })
      .catch((err) => setError(err.message))
      .finally(() => refreshHandler());
  };

  return (
    <MainCenter>
      <h2>Użytkownicy wykonujący popki</h2>
      {error && <div>{error}</div>}
      {users.length && (
        <ul className={classes.list}>
          {users.map((user, index) => {
            return (
              <li key={index} className={classes.list_item}>
                <span className={classes.list_item_username}>
                  <span>{user.username}</span>
                  <span>{user.shortcut}</span>
                </span>
                <Button
                  onClick={() => toggleUser(user.id)}
                  disabled={isLoading}
                  className={`${classes.list_item_button} ${
                    user.isDutyEnabled
                      ? classes.green_btn
                      : classes.red_btn
                  }`}
                >
                  {user.isDutyEnabled ? "Aktywny" : "Nieaktywny"}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
      {!users.length && <p>Nie znaleziono danych o użytkownikach.</p>}
    </MainCenter>
  );
}

export default TogglePage;
