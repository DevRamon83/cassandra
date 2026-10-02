import { errors, scopes } from "../../shared/index.ts";
import { currentSeasonQuery } from "../queries/currentSeasonQuery.ts";
import { client, kv } from "../db.ts";
import { leagueAggregator } from "../helpers/leagueAggregator.ts";
import { compressData } from "../helpers/compression.ts";

export const cacheLeagueData = async (league: string, season: string) => {
  try {
    if (!league || !season) {
      console.error(scopes.backend.getLeagueData, errors.leagueSeason);
      return { error: true, data: null };
    }

    const queryText = currentSeasonQuery();
    const result = await client.query(queryText, [league, season]);
    const data = result.rows;
    const { rounds, standings } = leagueAggregator(data);
    const compressedRounds = await compressData(rounds);
    const compressedStandings = await compressData(standings);

    await kv
      .atomic()
      .set(["leagues", league, season, "rounds"], compressedRounds)
      .set(["leagues", league, season, "standings"], compressedStandings)
      .commit();
    return { error: false, data: { rounds, standings } };
  } catch (err) {
    const error = err as Error;
    console.error(scopes.backend.getLeagueData, error.message);
    return { error: true, data: null };
  }
};
