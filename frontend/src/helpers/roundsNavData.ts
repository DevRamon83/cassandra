export const totalMatches = (league: string) => {
  if (league === "ligue1" || league === "Bundesliga") return 34;
  return 38;
};

export const defineFirstMatch = (show: number, games: number) => {
  if (show + 4 > games) {
    return games === 34 ? 26 : 30;
  } else if (show - 4 < 1) {
    return 1;
  } else {
    return show - 4;
  }
};
