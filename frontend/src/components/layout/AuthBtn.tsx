import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { classes } from "../../constants/classes";
import logout from "../../api/handlers/logout";
import { AuthContext } from "../../context";

export default function AuthBtn() {
  const { auth, setAuth } = useContext(AuthContext);

  const logoutHandler = async () => {
    const success = await logout();
    if (success.error) {
      // error handler
      return;
    }
    setAuth(null);
  };
  return (
    <>
      <NavLink
        to="/auth"
        className={({ isActive }) =>
          isActive ? `${classes.navbar.icon}Active` : classes.navbar.icon
        }
      >
        {auth ? (
          <button onClick={logoutHandler}>
            <img alt="logout" title="logout" src="/logout.svg" />
          </button>
        ) : (
          <img alt="login or signup" title="login or signup" src="/login.svg" />
        )}
      </NavLink>
    </>
  );
}
