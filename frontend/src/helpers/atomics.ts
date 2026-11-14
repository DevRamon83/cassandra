export const getRowClass = (
  index: number,
  eventClass: string,
  oddClass: string,
) => {
  return index % 2 === 0 ? eventClass : oddClass;
};

export const defineResult = (team1: number, team2: number) => {
  if (team1 === team2) return "d";
  if (team1 > team2) return "w";
  return "l";
};

export const definePoints = (result: string) => {
  if (result === "w") return 3;
  if (result === "l") return 0;
  return 1;
};
