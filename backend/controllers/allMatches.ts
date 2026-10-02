import { Context } from "@hono/hono";
import { errors } from "../../shared/index.ts";
import { cacheHandler } from "../services/cacheHandler.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";

export const allMatches = async (c: Context) => {
  try {
    const league = c.req.query("league");
    const season = c.req.query("season");

    if (!league || !season)
      return handleErrorResponse(c, errors.invalidURL, 400);

    const { error, standings, rounds } = await cacheHandler(league, season);
    if (error) return handleErrorResponse(c, "noData", 500);

    return c.json({ error: false, standings, rounds }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
