import { z } from "zod";
import type { authSchema } from "../schemas/authSchema";
import type { RoundsType } from "./AllMatches";

export interface SeasonSeeding {
  league: string;
  season: string;
}

export interface overrideInterface extends SeasonSeeding {
  matchday: RoundsType;
}

export interface NewMatchSeeding extends SeasonSeeding {
  game_week: number;
}

export interface LeaguePropsInterface {
  league: string;
  season: string;
}

export interface TeamDetailsInterface {
  cleanName: string;
  city: string;
}

export type AuthInterface = z.infer<typeof authSchema>;
