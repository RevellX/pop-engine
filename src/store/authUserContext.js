import React, { useState } from "react";
import {
  clearAuthToken,
  getLoggedUser,
  isAuthTokenValid,
  setAuthToken,
} from "../utils/token";

const UserContext = React.createContext({
  isLoggedIn: false,
  isModerator: false,
  isAdmin: false,
  login: (token, expire, user) => {},
  logout: () => {},
});

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(isAuthTokenValid());

  const isModerator = () => {
    const user = getLoggedUser();
    if (user && (user.type === "moderator" || user.type === "admin"))
      return true;
    return false;
  };

  const isAdmin = () => {
    const user = getLoggedUser();
    if (user && user.type === "admin") return true;
    return false;
  };

  const loginHandler = (token, expire, user) => {
    setAuthToken(token, expire, user);
    setIsLogged(true);
  };

  const logoutHandler = () => {
    clearAuthToken();
    setIsLogged(false);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: isLogged,
        isModerator: isModerator(),
        isAdmin: isAdmin(),
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
