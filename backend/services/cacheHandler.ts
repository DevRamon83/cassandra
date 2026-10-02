import { kv } from "../db.ts";
import { decompressData } from "../helpers/compression.ts";
import { Rounds, Standings } from "../typings/AllMatches.ts";
import { cacheLeagueData } from "./cacheLeagueData.ts";

export const cacheHandler = async (league: string, season: string) => {
  try {
    const roundsEntry = await kv.get<Uint8Array>([
      "leagues",
      league,
      season,
      "rounds",
    ]);
    const standingsEntry = await kv.get<Uint8Array>([
      "leagues",
      league,
      season,
      "standings",
    ]);

    if (roundsEntry.value && standingsEntry.value) {
      const rounds = await decompressData<Rounds>(roundsEntry.value);
      const standings = await decompressData<Standings>(standingsEntry.value);
      return { errors: false, standings, rounds };
    }

    const response = await cacheLeagueData(league, season);

    if (response.error || !response.data) {
      return {
        error: false,
        standings: null,
        rounds: null,
      };
    }

    return {
      error: true,
      standings: response.data.standings,
      rounds: response.data.rounds,
    };
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    return { error: true, standings: null, rounds: null };
  }
};
