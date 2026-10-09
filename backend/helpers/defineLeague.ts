import { serieA, liga, premier } from "../../shared/index.ts";

export const apiFootballLeagueDefiner = (league: string) => {
  switch (league) {
    case "serieA":
      return "it.1";
    case "liga":
      return "es.1";
    case "premier":
      return "en.1";
    default:
      return null;
  }
};

export const dictionaryLeagueDefiner = (league: string) => {
  switch (league) {
    case "serieA":
      return serieA;
    case "liga":
      return liga;
    case "premier":
      return premier;
    default:
      return null;
  }
};
