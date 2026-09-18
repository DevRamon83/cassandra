import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ol>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/faq">Faq</NavLink>
        </li>
      </ol>
    </nav>
  );
}
