import { Context } from "@hono/hono";
import { errors } from "../../shared/index.ts";
import { currentSeasonQuery } from "../queries/currentSeasonQuery.ts";
import client from "../db.ts";

export const allMatches = async (c: Context) => {
  try {
    const league = c.req.query("league");
    const season = c.req.query("season");

    if (!league || !season) {
      return c.json({ error: true, errorMsg: errors.invalidURL }, 400);
    }

    const queryText = currentSeasonQuery();
    const result = await client.query(queryText, [league, season]);

    return c.json({ error: false, data: result.rows }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
