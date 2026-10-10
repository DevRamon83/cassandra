import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { classes } from "../../constants/classes";

export default function AuthBtn() {
  const { logged } = useContext(AuthContext);
  return (
    <>
      {!logged ? (
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            isActive ? `${classes.navbar.icon}Active` : classes.navbar.icon
          }
        >
          <img alt="login or signup" title="login or signup" src="/login.svg" />
        </NavLink>
      ) : (
        <img alt="logout" title="logout" src="/logout.svg" />
      )}
    </>
  );
}
