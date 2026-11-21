import type { Rounds, SingleBet, Standings, User } from "../../../shared";
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
  errorMessage: string;
  data: User;
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
  aborted: boolean;
}

export interface NewBetResponse {
  status: number;
  error: boolean;
  errorMessage: string;
  data: string;
}

export interface MyBetsResponse {
  status: number;
  error: boolean;
  errorMessage: string;
  aborted: boolean;
  data: SingleBet[];
}
