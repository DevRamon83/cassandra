import type { Context, Next } from "hono";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { getBody } from "../helpers/getBody.ts";
import {
  validIds,
  validPoints,
  validResult,
  validScores,
} from "../helpers/matchValidators.ts";
import { scopes } from "../../shared/index.ts";

export const matchValidator = async (c: Context, next: Next) => {
  const body = await getBody(c);

  const scope = scopes.backend.matchValidator;

  const {
    id,
    home_score,
    home_result,
    home_points,
    away_score,
    away_result,
    away_points,
  } = body;

  const status = { success: true, error: "" };

  const isValidId = validIds([id], status, scope);
  if (!isValidId) return handleErrorResponse(c, "invalidId", 400, true);

  const isValidScore = validScores(home_score, away_score, status, scope);
  if (!isValidScore) return handleErrorResponse(c, "invalidScore", 400, true);

  const isValidPoints = validPoints(home_points, away_points, status, scope);
  if (!isValidPoints) return handleErrorResponse(c, "invalidPoints", 400, true);

  const isValidResult = validResult(home_result, away_result, status, scope);
  if (!isValidResult) return handleErrorResponse(c, "invalidResult", 400, true);

  const data = {
    id: Number(id),
    home_score,
    home_result,
    home_points,
    away_score,
    away_result,
    away_points,
  };

  c.set("matchToFix", data);

  return next();
};
