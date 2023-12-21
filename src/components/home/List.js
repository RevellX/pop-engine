import Pop from "./Pop";
import classes from "./List.module.css";
import Card from "../../ui/Card";
import { useContext, useState } from "react";
import Button from "../../ui/Button";
import { useNavigation, useSubmit } from "react-router-dom";
import UserContext from "../../store/authUserContext";
import Modal from "../../ui/Modal";

function List({ pops }) {
  const submit = useSubmit();
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
        <h2>Wykaz popołudniówek</h2>
        {userCtx.isLoggedIn && userCtx.isModerator && (
          <>
            <Button
              disabled={selectedPops.length !== 2 || isWorking}
              color='yellow'
              onClick={swapPop}
            >
              {isWorking ? "Działanie..." : "Zamień popki"}
            </Button>
            <Button
              disabled={selectedPops.length !== 1 || isWorking}
              color='red'
              onClick={openDelete}
            >
              {isWorking ? "Działanie..." : "Usuń popkę"}
            </Button>
          </>
        )}

        <ul className={classes.list}>
          {pops.map((pop) => {
            const popDate = new Date(pop.date);
            return (
              <Pop
                key={pop.id}
                id={pop.id}
                date={popDate}
                shortcut={pop.user.shortcut}
                name={pop.user.username}
                isSelected={selectedPops.includes(pop.id)}
                selectPop={selectPopHandler}
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
