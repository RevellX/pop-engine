import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Alert from "../ui/Alert";
import { useContext, useEffect } from "react";
import UserContext from "../store/authUserContext";
import Main from "../ui/main/MainCenter";

function LogoutPage() {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    userCtx.logout();
  }, [userCtx]);

  return (
    <Main>
      <Card style={{ textAlign: "center" }}>
        <Alert variant='success'>
          Zostałeś poprawnie wylogowany.
        </Alert>
        <Link to={"/"}>
          <button style={{ fontSize: "1rem", padding: "0.5rem" }}>
            Kliknij tutaj, aby wrócić
          </button>
        </Link>
      </Card>
    </Main>
  );
}

export default LogoutPage;
