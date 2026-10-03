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
