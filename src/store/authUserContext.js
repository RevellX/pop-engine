import React, { useState } from "react";
import {
  clearAuthToken,
  getLoggedUser,
  isAuthTokenValid,
  setAuthToken,
} from "../utils/token";

const UserContext = React.createContext({
  isLoggedIn: false,
  hasPermission: (permission) => {},
  login: (token, expire, user) => {},
  logout: () => {},
  getUser: () => {},
});

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(isAuthTokenValid());

  const getUserHandler = () => {
    return getLoggedUser();
  };

  const userHasPermission = (permission) => {
    const user = getLoggedUser();
    if (!user) return false;
    const userPermissions = user.permissions;
    const [module, action] = permission.split(".");

    /*
  permissions: {
    "duties.delete": false
    "duties.swap": true
    "files.delete": true
    "files.upload": true
    "finance.*": true
    "finance.add": false
  }

  module: "duties"
  action: "add"
    */

    const permissionCheck = {
      module: module,
      action: action,
    };

    let result = false;
    if (
      userPermissions[permissionCheck.module] &&
      userPermissions[permissionCheck.module][permissionCheck.action]
    ) {
      result =
        userPermissions[permissionCheck.module][
          permissionCheck.action
        ];
    } else if (
      userPermissions[permissionCheck.module] &&
      "*" in userPermissions[permissionCheck.module]
    ) {
      result = userPermissions[permissionCheck.module]["*"];
    }
    if (result === "true") result = true;
    else if (result === "false") result = false;
    return result;
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
        hasPermission: userHasPermission,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUserHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
