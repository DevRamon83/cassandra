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

export const getMatchDate = (myDate: string | null) => {
  if (!myDate) return { matchDate: "-", time: "-" };
  const date = new Date(myDate);
  const matchDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });

  const time = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { matchDate, time };
};
