import type { Context } from "hono";
import { cacheLeagueData } from "../services/cacheLeagueData.ts";

export const refreshCache = async (c: Context) => {
  try {
    const body = c.get("leagueData");

    await cacheLeagueData(body.league, body.season);

    return c.json({ error: false, message: "Success" }, 200);
  } catch (err) {
    const error = err as Error;
    console.log("error ", error.message);
    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
