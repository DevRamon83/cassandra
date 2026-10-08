import { Context } from "@hono/hono";
import { apiFootball } from "../services/apiFootball.ts";
import { populateTeams } from "../pipelines/populateTeams.ts";
import { errors, messages } from "../../shared/index.ts";
import { populateMatches } from "../pipelines/populateMatches.ts";
import { cacheLeagueData } from "../services/cacheLeagueData.ts";
import { handleErrorResponse } from "../helpers/handleErrorResponse.ts";

export const updateSeason = async (c: Context) => {
  try {
    const updateData = c.get("updateData");

    const seasonData = await apiFootball(updateData);

    if (!seasonData || seasonData.error || !seasonData.data) {
      const errorMsg = seasonData.errorMsg || errors.apiFootball;
      return handleErrorResponse(c, errorMsg, 500);
    }

    const data = await populateTeams(seasonData.data, updateData);

    if (data.error) return handleErrorResponse(c, errors.teamsPopulation, 500);

    const success = await populateMatches(
      seasonData.data,
      updateData,
      data.resp,
    );

    if (!success) return handleErrorResponse(c, errors.matchesPopulation, 500);

    await cacheLeagueData(updateData.league, updateData.season);

    return c.json({ error: false, data: messages.seasonSeeding }, 200);
  } catch (err) {
    const error = err as Error;

    return c.json({ error: true, errorMsg: error.message }, 500);
  }
};
