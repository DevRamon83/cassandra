import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { classes } from "../../constants/classes";
import logout from "../../api/handlers/logout";

export default function AuthBtn() {
  const { logged, setLogged } = useContext(AuthContext);

  const logoutHandler = async () => {
    const success = await logout();
    if (success.error) {
      // error handler
      return;
    }
    setLogged(null);
  };
  return (
    <>
      <NavLink
        to="/auth"
        className={({ isActive }) =>
          isActive ? `${classes.navbar.icon}Active` : classes.navbar.icon
        }
      >
        {logged ? (
          <img
            onClick={logoutHandler}
            alt="logout"
            title="logout"
            src="/logout.svg"
          />
        ) : (
          <img alt="login or signup" title="login or signup" src="/login.svg" />
        )}
      </NavLink>
    </>
  );
}
