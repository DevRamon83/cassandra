import { Context } from "@hono/hono";
import { getBody } from "../helpers/getBody.ts";
import { apiFootball } from "../services/apiFootball.ts";
import { populateTeams } from "../pipelines/populateTeams.ts";
import { errors, messages } from "../../shared/index.ts";

export const newSeason = async (c: Context) => {
  try {
    const body = await getBody(c);
    if (!body) {
      return c.json({ error: true, errorMsg: errors.bodyMissing }, 500);
    }

    const seasonData = await apiFootball(body);

    if (!seasonData || seasonData.error || !seasonData.data) {
      return c.json(
        {
          error: true,
          errorMsg: seasonData.errorMsg || errors.apiFootball,
        },
        500,
      );
    }

    const response = await populateTeams(seasonData.data);

    if (!response)
      return c.json({ error: true, errorMsg: errors.teamsPopulation }, 500);

    return c.json({ error: false, data: messages.seasonSeeding }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
