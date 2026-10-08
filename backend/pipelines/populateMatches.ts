import type { GithubSeasonData } from "../typings/GithubSeasonData.ts";
import { client } from "../db.ts";
import { matchesQuery } from "../queries/matchesQuery.ts";
import { SeasonSeed } from "../../shared/index.ts";

type resp = boolean;

export const populateMatches = async (
  seasonData: GithubSeasonData,
  updateData: SeasonSeed,
  teamsMap: {
    id: string;
    team_name: string;
  }[],
): Promise<resp> => {
  const query = matchesQuery(seasonData, updateData, teamsMap);
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
