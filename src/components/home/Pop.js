import { useContext } from "react";
import classes from "./Pop.module.css";
import UserContext from "../../store/authUserContext";

function Pop({ id, date, name, shortcut, isSelected, selectPop }) {
  const userCtx = useContext(UserContext);
  const options = { dateStyle: "full" };
  let dateString = date
    .toLocaleDateString("pl-PL", options)
    .replace(",", "");
  dateString = dateString.slice(0, dateString.length - 4);
  dateString = dateString.split(" ");

  const checkChangeHandler = (e) => {
    selectPop(id);
  };

  return (
    <li className={classes.pop}>
      {/* {date.getDate()}-{getMonthVerbally(date.getMonth() + 1)} <br /> */}
      <div>
        {dateString.map((dateString, index) => (
          <div key={index}>{dateString}</div>
        ))}
      </div>
      <div>
        <span>{name}</span>
        <span>{shortcut}</span>
      </div>
      {userCtx.isLoggedIn && userCtx.isModerator && (
        <input
          type='checkbox'
          checked={isSelected}
          onChange={checkChangeHandler}
        />
      )}
    </li>
  );
}

export default Pop;
