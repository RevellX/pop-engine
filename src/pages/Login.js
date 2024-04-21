import { Navigate, useActionData } from "react-router-dom";
import Form from "../components/login/Form";
import { LOGIN_URL } from "../utils/config";
import { useContext } from "react";
import UserContext from "../store/authUserContext";
import Main from "../ui/main/MainCenter";

function LoginPage() {
  const actionData = useActionData();
  const userCtx = useContext(UserContext);

  if (actionData && actionData.login) {
    const { expire, token, user } = actionData.login;
    userCtx.login(token, expire, user);
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <Main>
      <Form />
    </Main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const loginInput = formData.get("login");
  const passwordInput = formData.get("password");

  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: loginInput,
      password: passwordInput,
    }),
  });

  const responseJsoned = await response.json();

  if (response.ok) {
    const { expire, token, user } = responseJsoned;
    return { login: { token: token, expire: expire, user: user } };
  } else {
    return {
      alert: {
        type: "error",
        message: responseJsoned.message
          ? responseJsoned.message
          : "Server error accured.",
      },
    };
  }
}

export default LoginPage;
