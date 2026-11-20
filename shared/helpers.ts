import type { Standings } from "./typings/AllMatches";

export const getCurrentSeason = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const earlySeason = [7, 8, 9, 10, 11, 12];
  if (earlySeason.includes(currentMonth)) {
    return `${currentYear}/${currentYear + 1}`;
  }
  return `${currentYear - 1}/${currentYear}`;
};

export const totalMatches = (league: string) => {
  if (league === "ligue1" || league === "bundesliga") return 34;
  return 38;
};

export const getNextRound = (standings: Standings) => {
  let matchesPlayed = 0;
  let howManyTeams = 0;
  const teams = Object.keys(standings);
  for (const team of teams) {
    matchesPlayed += standings[team].played;
    howManyTeams += 1;
  }

  const average = matchesPlayed / howManyTeams;
  return Math.round(average) + 1;
};

export const getSeasonLength = (standing: Standings) => {
  const played = getNextRound(standing) - 1;
  return { seasonLength: 38 - played, played };
};
