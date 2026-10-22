import type { Context, Next } from "hono";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { errors } from "../../shared/index.ts";
import { dictionaryLeagueDefiner } from "../helpers/defineLeague.ts";
import {
  validContext,
  validGameWeek,
  validIds,
  validPoints,
  validResult,
  validScores,
  validTeams,
} from "../helpers/overrides.ts";

export const overrideValidator = async (c: Context, next: Next) => {
  const body = c.get("updateData");

  const dictionary = dictionaryLeagueDefiner(body.league);

  if (!dictionary)
    return handleErrorResponse(c, errors.invalidLeague, 400, true);

  const matchday = body.matchday;
  const ids = Object.keys(matchday);

  const status = { success: true, error: "" };

  for (const id of ids) {
    const { home_team_id, away_team_id } = matchday[id];
    const idsToCheck = [id, matchday[id].id, home_team_id, away_team_id];
    if (!validIds(idsToCheck, status)) break;

    const { season, league } = matchday[id];
    if (!validContext(season, league, body.season, body.league, status)) break;

    const { home_score, away_score } = matchday[id];
    if (!validScores(home_score, away_score, status)) break;

    const { home_points, away_points } = matchday[id];
    if (!validPoints(home_points, away_points, status)) break;

    const { home_result, away_result } = matchday[id];
    if (!validResult(home_result, away_result, status)) break;

    const { home_team_name, away_team_name } = matchday[id];
    if (!validTeams(home_team_name, away_team_name, status, dictionary)) break;

    const { game_week } = matchday[id];
    if (!validGameWeek(game_week, league, status)) break;
  }

  if (!status.success) return handleErrorResponse(c, status.error, 400, true);

  return next();
};
