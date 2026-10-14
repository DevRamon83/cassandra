import { classes } from "./classes";

export const pages = {
  homepage: {
    url: "/",
    alt: "Go to the Homepage",
    title: "Homepage",
    className: classes.navbar.logo,
    src: "/logo.svg",
    end: true,
  },
  standings: {
    url: "/standings",
    alt: "Go to Leagues page",
    title: "leagues",
    className: classes.navbar.icon,
    src: "/icons/leagues.svg",
    end: false,
  },
  faq: {
    url: "/faq",
    alt: "Go to FAQ page",
    title: "faq",
    className: classes.navbar.icon,
    src: "/icons/faq.svg",
    end: false,
  },
  dashboard: {
    url: "/dashboard",
    alt: "Go to dashboard page",
    title: "dashboard",
    className: classes.navbar.icon,
    src: "/icons/dashboard.svg",
    end: false,
  },
};

export const tags = ["homepage", "standings", "faq"];
