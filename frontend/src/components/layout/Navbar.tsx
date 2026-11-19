import { NavLink } from "react-router-dom";
import { pages, tags } from "../../constants/pages";
import AuthBtn from "./AuthBtn";
import { useContext, useEffect } from "react";
import checkAuth from "../../api/handlers/checkAuth";
import { AuthContext } from "../../App";
import type { PagesInterface } from "../../typings/interfaces";
import DashboardBtn from "./DashboardBtn";

export type PagesType = Record<string, PagesInterface>;

export default function Navbar() {
  const pagesConfig = pages as PagesType;
  const { auth, setAuth } = useContext(AuthContext);

  const checkHandler = async () => {
    const res = await checkAuth();
    if (res.error) return;
    setAuth(res.data);
  };

  useEffect(() => {
    checkHandler();
  }, []);

  return (
    <nav>
      {tags.map((tag) => {
        const page = pagesConfig[tag];

        return (
          <NavLink
            key={`page-${tag}`}
            to={page.url}
            end={page.end}
            className={({ isActive }) =>
              isActive ? `${page.className}Active` : page.className
            }
          >
            <img alt={page.alt} title={page.title} src={page.src} />
          </NavLink>
        );
      })}

      {auth?.username && <DashboardBtn dashConfig={pagesConfig.dashboard} />}

      <AuthBtn />
    </nav>
  );
}
