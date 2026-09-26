import { getTeams } from "../helpers/getTeams.ts";
import { teamsQuery } from "../queries/teamsQuery.ts";
import { Interfaces } from "../../shared/index.ts";
import type GithubSeasonData from "../interfaces/GithubSeasonData.ts";
import client from "../db.ts";

export const populateTeams = async (
  seasonData: GithubSeasonData,
): Promise<boolean> => {
  const teams = getTeams(seasonData) as Interfaces.TeamKey[];
  const query = teamsQuery(teams);

  if (!query) return false;

  try {
    await client.query(query.text, query.values);
    return true;
  } catch (err) {
    err as Error;
    return false;
  }
};
