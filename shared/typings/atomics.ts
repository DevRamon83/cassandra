import { z } from "zod";
import type { authSchema } from "../schemas/authSchema";

export interface SeasonSeed {
  league: string;
  season: string;
}

export interface LeagueProps {
  league: string;
  season: string;
}

export interface TeamDetails {
  cleanName: string;
  city: string;
}

export type AuthInterface = z.infer<typeof authSchema>;

export type PredictionData = {
  match_id: string;
  prediction: string | null;
  prediction_result: boolean | null;
  prediction_accuracy: string | null;
};

export interface User {
  id: string;
  username: string;
  bankroll_id: string | null;
  initial_budget: number | null;
  current_budget: number | null;
  season: string | null;
}
