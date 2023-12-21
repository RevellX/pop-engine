import { useRef, useState } from "react";
import Alert from "../../ui/Alert";
import Card from "../../ui/Card";
import classes from "./Form.module.css";
import {
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

function Form() {
  /*
    This form accepts three types of alerts from action in following form: 
     {
        alert: {
            type: "info || success || error",
            message: simple JSX or String
        }
     }
    */
  const actionData = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const loginRef = useRef();
  const passwordRef = useRef();

  const [loginIsValid, setLoginIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const isWorking =
    navigation.state === "loading" &&
    navigation.state === "submitting";

  const validateLogin = () => {
    const login = loginRef.current.value;
    if (
      login.length < 3 ||
      login.length > 12 ||
      !/^[a-zA-Z0-9]+$/.test(login)
    ) {
      setLoginIsValid(false);
      return false;
    }
    setLoginIsValid(true);
    return true;
  };

  const validatePassword = () => {
    const password = passwordRef.current.value;
    if (password.length < 4 || password.length > 12) {
      setPasswordIsValid(false);
      return false;
    }
    setPasswordIsValid(true);
    return true;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (validateLogin() && validatePassword()) {
      const formData = new FormData();
      formData.append("login", loginRef.current.value);
      formData.append("password", passwordRef.current.value);

      submit(formData, { method: "POST" });
    }
  };

  return (
    <form onSubmit={onSubmitHandler} method='POST'>
      <Card className={classes.wrapper}>
        <div className={classes.form_group}>
          <label htmlFor='login'>Login</label>
          <input
            className={`${
              loginIsValid ? classes.valid : classes.invalid
            }`}
            type='text'
            name='login'
            id='login'
            ref={loginRef}
            onBlur={() => validateLogin()}
          />
        </div>
        <div className={classes.form_group}>
          <label htmlFor='password'>Password</label>
          <input
            className={`${
              passwordIsValid ? classes.valid : classes.invalid
            }`}
            type='password'
            name='password'
            id='password'
            ref={passwordRef}
            onBlur={() => validatePassword()}
          />
        </div>
        {actionData && actionData.alert && (
          <Alert variant={actionData.alert.type}>
            {actionData.alert.message}
          </Alert>
        )}
        <div className={classes.form_group}>
          <button disabled={isWorking ? true : false} type='submit'>
            {isWorking ? "Logging in..." : "Login"}
          </button>
        </div>
      </Card>
    </form>
  );
}

export default Form;
