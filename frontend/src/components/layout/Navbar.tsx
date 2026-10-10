import { NavLink } from "react-router-dom";
import { pages, tags } from "../../constants/pages";
import AuthBtn from "./AuthBtn";

interface PagesInterface {
  url: string;
  alt: string;
  title: string;
  className: string;
  src: string;
  end: boolean;
}

export type PagesType = Record<string, PagesInterface>;

export default function Navbar() {
  const pagesConfig = pages as PagesType;

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

      <AuthBtn />
    </nav>
  );
}
