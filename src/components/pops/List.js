import Pop from "./Pop";
import classes from "./List.module.css";
import Card from "../../ui/Card";
import { useContext, useState } from "react";
import Button from "../../ui/Button";
import {
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import UserContext from "../../store/authUserContext";
import Modal from "../../ui/Modal";

function List({ pops }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const userCtx = useContext(UserContext);
  const [selectedPops, setSelectedPops] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  let isWorking;

  if (
    navigation.state === "loading" ||
    navigation.state === "submitting"
  )
    isWorking = true;
  else isWorking = false;

  const selectPopHandler = (popId) => {
    if (selectedPops.includes(popId)) {
      // Already selected
      setSelectedPops((prevState) =>
        prevState.filter((pop) => pop !== popId)
      );
    } else if (selectedPops.length < 2) {
      // Not already selected and less than 2 alreadt selected
      setSelectedPops((prevState) => [...prevState, popId]);
    }
  };

  const swapPop = () => {
    const formData = new FormData();
    formData.append("action", "swap");
    formData.append("popOne", selectedPops[0]);
    formData.append("popTwo", selectedPops[1]);
    setSelectedPops([]);
    submit(formData, { method: "POST" });
  };

  const openDelete = () => {
    setIsDeleting(true);
  };

  const closeDelete = () => {
    setIsDeleting(false);
  };

  const deletePop = () => {
    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("popId", selectedPops[0]);
    setSelectedPops([]);
    closeDelete();
    submit(formData, { method: "POST" });
  };

  if (pops.length) {
    return (
      <Card className={classes.wrapper}>
        {isDeleting && (
          <Modal
            title={"Na pewno usunąć?"}
            content={
              "Usunięcie spowoduje przesunięcie wszyskich popek o jeden dzień do przodu."
            }
            yesButton={"Tak"}
            noButton={"Nie"}
            onYes={deletePop}
            onNo={closeDelete}
            onClose={closeDelete}
          />
        )}
        <h2>Jerzowe Popołudniówki</h2>
        {userCtx.isLoggedIn && (
          <>
            {userCtx.hasPermission("duties.swap") && (
              <Button
                disabled={selectedPops.length !== 2 || isWorking}
                color='yellow'
                onClick={swapPop}
              >
                {isWorking ? "Działanie..." : "Zamień"}
              </Button>
            )}

            {userCtx.hasPermission("duties.delete") && (
              <Button
                disabled={selectedPops.length !== 1 || isWorking}
                color='red'
                onClick={openDelete}
              >
                {isWorking ? "Działanie..." : "Usuń"}
              </Button>
            )}
            {userCtx.hasPermission("duties.toggle") && (
              <Button onClick={() => navigate("toggle")}>
                {isWorking ? "Działanie..." : "Wybierz"}
              </Button>
            )}
          </>
        )}

        <ul className={classes.list}>
          {pops.map((pop, index) => {
            const popDate = new Date(pop.date);
            let nextPopDate = undefined;
            if (index < pops.length - 1) {
              nextPopDate = new Date(pops[index + 1].date);
            }
            return (
              <Pop
                key={pop.id}
                id={pop.id}
                date={popDate}
                shortcut={pop.user.shortcut}
                name={pop.user.username}
                isSelected={selectedPops.includes(pop.id)}
                selectPop={selectPopHandler}
                isHighlighted={index === 0 ? true : false}
                spacerAfter={
                  nextPopDate
                    ? popDate.getDay() > nextPopDate.getDay()
                    : false
                }
              />
            );
          })}
        </ul>
      </Card>
    );
  }

  return <p>Nie znaleziono danych o popołudniówkach.</p>;
}

export default List;
