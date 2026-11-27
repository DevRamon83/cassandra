export const allowedTypes: string[] = [
  "boolean",
  "number",
  "object",
  "string",
  "symbol",
  "array",
  "bigint",
];

export const matchesArray: string[] = [
  "league",
  "season",
  "match_date",
  "home_team_id",
  "away_team_id",
  "home_score",
  "home_result",
  "home_points",
  "away_score",
  "away_result",
  "away_points",
  "game_week",
];

export const predictionsArray: string[] = [
  "match_id",
  "prediction",
  "prediction_result",
  "prediction_accuracy",
  "settled_at",
];

export const leagues: string[] = [
  "serieA",
  "liga",
  "ligue1",
  "premier",
  "bundesliga",
];

export const columns = [
  "#",
  "Team",
  "Pl",
  "W",
  "D",
  "L",
  "F",
  "A",
  "GD",
  "Pts",
];

export const endpoints = ["signup", "login"];

export const matchResult = ["w", "d", "l"];
export const matchPoints = [0, 1, 3];

export const outcomes = ["1", "X", "2", "UNDER", "OVER", "GOAL", "NOGOAL"];

export const betFilter = {
  all: "All",
  pending: "Pending",
  won: "Won",
  lost: "Lost",
};

export const leaguesFilter = {
  all: "all",
  serieA: "serieA",
  liga: "liga",
  bundesliga: "bundesliga",
  ligue1: "ligue1",
  premier: "premier",
};

export const toleranceFilter = {
  "0": "0",
  "1": "1",
  "2": "2",
};

export const marketsFilter = {
  "under/over": "under/over",
  "goal/nogoal": "goal/nogoal",
};

export const predictionsFilter = {
  all: "all",
  under: "under",
  over: "over",
  goal: "goal",
  nogoal: "nogoal",
};

export const tailFilter = {
  all: "all",
  three: "last three",
  five: "last five",
};

export const OUTCOME_COLORS = {
  won: "#22c55e",
  lost: "#ef4444",
  pending: "ivory",
  goal: "gold",
  nogoal: "dimgray",
  under: "black",
  over: "#FF6B00",
};
