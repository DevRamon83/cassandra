import { NavLink } from "react-router-dom";
import type { PagesInterface } from "../../typings/interfaces";

export default function DashboardBtn({
  dashConfig,
}: {
  dashConfig: PagesInterface;
}) {
  return (
    <NavLink
      to="/dashboard"
      className={({ isActive }) =>
        isActive ? `${dashConfig.className}Active` : dashConfig.className
      }
    >
      <img alt={dashConfig.alt} title={dashConfig.title} src={dashConfig.src} />
    </NavLink>
  );
}
