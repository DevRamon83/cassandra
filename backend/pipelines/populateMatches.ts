import type { GithubSeasonData } from "../typings/GithubSeasonData.ts";
import { client } from "../db.ts";
import { matchesQuery } from "../queries/matchesQuery.ts";
import { Interfaces } from "../../shared/index.ts";

type resp = boolean;

export const populateMatches = async (
  seasonData: GithubSeasonData,
  body: Interfaces.SeasonSeed,
  teamsMap: {
    id: string;
    team_name: string;
  }[],
): Promise<resp> => {
  const query = matchesQuery(seasonData, body, teamsMap);
  if (query.error) return false;

  try {
    await client.query(query.text, query.values);

    return true;
  } catch (err) {
    err as Error;
    console.error(err);
    return false;
  }
};
