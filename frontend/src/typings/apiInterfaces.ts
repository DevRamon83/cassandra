import type { Rounds, Standings } from "../../../shared";
import type { PredictionDB } from "./interfaces";

export interface StandardResponse {
  status: number;
  error: boolean;
  errorMessage?: string;
}

export interface LeagueResponse {
  error: boolean;
  standings: Standings;
  rounds: Rounds;
  aborted: boolean;
}

export interface AuthResponse {
  status: number;
  error: boolean;
  username: string;
  errorMessage: string;
}

export interface LogoutResponse {
  status: number;
  error: boolean;
  message: string;
}

export interface ErrorResponse {
  aborted: boolean;
  error: boolean;
}

export interface PredictionsResponse {
  data: PredictionDB[];
  error: boolean;
}
