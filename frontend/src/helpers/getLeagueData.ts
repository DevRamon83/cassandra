import type { Standings } from "../../../shared";

export const getPositions = (standings: Standings) => {
  const positions = Object.keys(standings).sort((a, b) => {
    return (
      standings[b].points - standings[a].points ||
      standings[b].gd - standings[a].gd
    );
  });

  return positions;
};

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

export const getMatchDate = (myDate: string | null) => {
  if (!myDate) return { matchDate: "-", time: "-" };
  const date = new Date(myDate);
  const matchDate = date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { matchDate, time };
};
