import type { LeagueData } from "../../../shared";

export interface PagesInterface {
  url: string;
  alt: string;
  title: string;
  className: string;
  src: string;
  end: boolean;
}

export interface AuthError {
  username: string[] | undefined;
  psw: string[] | undefined;
  endpoint: string[] | undefined;
}

export interface OverrideUI {
  league: string;
  season: string;
  myLeague: LeagueData;
}
