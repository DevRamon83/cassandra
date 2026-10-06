import { serieA } from "../index.ts";

export type Team = keyof typeof serieA;

export interface SeasonSeeding {
  league: string;
  season: string;
}

export interface NewMatchSeeding extends SeasonSeeding {
  game_week: number;
}

export interface LeaguePropsInterface {
  league: string;
  season: string;
}
