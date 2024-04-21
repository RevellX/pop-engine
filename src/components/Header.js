import { Link, NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { useContext } from "react";
import UserContext from "../store/authUserContext";

function Header() {
  const userCtx = useContext(UserContext);

  return (
    <header className={classes.header}>
      <Link className={classes.brand} to='/'>
        <h3>R-Engine</h3>
      </Link>
      <nav className={classes.nav}>
        <NavLink
          to={"/"}
          end
          className={({ isActive }) =>
            isActive ? classes.active : undefined
          }
        >
          Menu
        </NavLink>
        <NavLink
          to={"/pops"}
          className={({ isActive }) =>
            isActive ? classes.active : undefined
          }
        >
          Popki
        </NavLink>
        {userCtx.hasPermission("finance.list") && (
          <NavLink
            to={"/finance"}
            end
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Wydatki
          </NavLink>
        )}
        {userCtx.isLoggedIn && (
          <>
            <NavLink
              to={"/logout"}
              end
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Wyloguj
            </NavLink>
          </>
        )}
        {!userCtx.isLoggedIn && (
          <NavLink
            to={"/login"}
            end
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Logowanie
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
