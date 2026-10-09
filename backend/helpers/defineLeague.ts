import {
  serieA,
  liga,
  premier,
  ligue1,
  bundesliga,
} from "../../shared/index.ts";

export const apiFootballLeagueDefiner = (league: string) => {
  switch (league) {
    case "serieA":
      return "it.1";
    case "liga":
      return "es.1";
    case "premier":
      return "en.1";
    case "ligue1":
      return "fr.1";
    case "bundesliga":
      return "de.1";
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
    case "ligue1":
      return ligue1;
    case "bundesliga":
      return bundesliga;
    default:
      return null;
  }
};
