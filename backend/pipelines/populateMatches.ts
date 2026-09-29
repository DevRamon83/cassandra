import type { GithubSeasonData } from "../interfaces/GithubSeasonData.ts";
import client from "../db.ts";
import { matchesQuery } from "../queries/matchesQuery.ts";
import { Interfaces } from "../../shared/index.ts";

interface resp {
  error: boolean;
  resp: string | null;
}

export const populateMatches = async (
  seasonData: GithubSeasonData,
  body: Interfaces.GameWeek,
  teamsMap: {
    id: string;
    team_name: string;
  }[],
): Promise<resp> => {
  const query = matchesQuery(seasonData, body, teamsMap);
  if (query.error) return { error: true, resp: null };

  try {
    await client.query(query.text, query.values);

    return { error: false, resp: "success" };
  } catch (err) {
    err as Error;
    console.error(err);
    return { error: true, resp: null };
  }
};
