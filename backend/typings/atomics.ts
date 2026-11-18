import type { Match } from "../../shared/index.ts";

export interface TokensInterface {
  access: string;
  refresh: string;
  username: string;
  id: string;
}

export interface CheckTokenResult {
  status: string;
  username: string | null;
  id: string | null;
}

export interface Status {
  success: boolean;
  error: string;
}

export interface OverrideBody {
  league: string;
  season: string;
  matchday: Record<string, Match>;
}

export interface TeamStats {
  home: boolean;
  GNG: boolean[];
  UO: boolean[];
}

export type TeamsMap = Map<string, TeamStats>;
