import { errors, matchPoints, matchResult } from "../../shared/index.ts";
import type { Status } from "../typings/atomics.ts";

export const validIds = (array: string[], status: Status, scope: string) => {
  for (const value of array) {
    const parsed = Number(value);
    if (isNaN(parsed) || parsed < 0) {
      status.success = false;
      status.error = scope + errors.invalidId;
      return false;
    }
  }
  return true;
};

export const validScores = (
  homeScore: number,
  awayScore: number,
  status: Status,
  scope: string,
) => {
  if (
    typeof homeScore !== "number" ||
    homeScore > 10 ||
    homeScore < 0 ||
    typeof awayScore !== "number" ||
    awayScore > 10 ||
    awayScore < 0
  ) {
    status.error = scope + errors.invalidType;
    status.success = false;
    return false;
  }
  return true;
};

export const validResult = (
  home: string,
  away: string,
  status: Status,
  scope: string,
) => {
  if (!matchResult.includes(home) || !matchResult.includes(away)) {
    status.error = scope + errors.invalidResult;
    status.success = false;
    return false;
  }

  return true;
};

export const validPoints = (
  home: number,
  away: number,
  status: Status,
  scope: string,
) => {
  if (!matchPoints.includes(home) || !matchPoints.includes(away)) {
    status.error = scope + errors.invalidPoints;
    status.success = false;
    return false;
  }

  return true;
};
