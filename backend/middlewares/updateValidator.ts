import { Context, Next } from "@hono/hono";
import { getBody } from "../helpers/getBody.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";
import { errors, leagues, getCurrentSeason } from "../../shared/index.ts";

export const updateValidator = async (c: Context, next: Next) => {
  const body = await getBody(c);
  if (!body || !body.league || !body.season)
    return handleErrorResponse(c, errors.bodyMissing, 400);

  if (!leagues.includes(body.league))
    return handleErrorResponse(c, errors.invalidLeague, 400);

  const currentSeason = getCurrentSeason();
  if (currentSeason !== body.season)
    return handleErrorResponse(c, errors.invalidSeason, 400);
  c.set("updateData", body);

  await next();
};
