import { Context } from "@hono/hono";
import { getBody } from "../helpers/getBody.ts";
import { apiFootball } from "../services/apiFootball.ts";
import { getTeams } from "../helpers/getTeams.ts";

export const newSeason = async (c: Context) => {
  try {
    const body = await getBody(c);
    if (!body) {
      // handle return
    }

    const seasonData = await apiFootball(body);
    const teams = getTeams(seasonData.data);
    console.log(teams);

    return c.json({ error: false, data: seasonData }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
