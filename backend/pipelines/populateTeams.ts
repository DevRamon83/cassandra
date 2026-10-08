import { getTeams } from "../helpers/getTeams.ts";
import { teamsQuery, teamsTable } from "../queries/teamsQuery.ts";
import { SeasonSeed, TeamKey } from "../../shared/index.ts";
import type { GithubSeasonData } from "../typings/GithubSeasonData.ts";
import { client } from "../db.ts";

export type resp =
  | { error: true; resp: null }
  | { error: false; resp: { id: string; team_name: string }[] };

export const populateTeams = async (
  seasonData: GithubSeasonData,
  updateData: SeasonSeed,
): Promise<resp> => {
  const teams = getTeams(seasonData, updateData) as TeamKey[];

  const query = teamsQuery(teams, updateData.league);

  if (!query) return { error: true, resp: null };

  try {
    await client.query(query.text, query.values);
    const result = await client.query(teamsTable);

    return { error: false, resp: result.rows };
  } catch (err) {
    err as Error;
    console.error(err);
    return { error: true, resp: null };
  }
};
